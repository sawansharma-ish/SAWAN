#!/usr/bin/env bash

# ==============================================================================
# Enterprise Git Automation & Vercel Deployment Orchestrator
# ==============================================================================
# This script automates staging, linting, building, conventional committing,
# pushing to GitHub, and triggering/verifying Vercel deployments.
# ==============================================================================

# Exit immediately if a command exits with a non-zero status, except in pipes/checks
set -o pipefail

# Text Formatting Utilities
bold="\033[1m"
dim="\033[2m"
underline="\033[4m"
reset="\033[0m"

# Brand Colors (AURA Purple Theme)
purple="\033[38;2;124;58;237m"
slate="\033[38;2;148;163;184m"
green="\033[32m"
yellow="\033[33m"
red="\033[31m"
cyan="\033[36m"

# Console Logging Helpers
info() {
  echo -e "${purple}[Aura Deployer]${reset} ${slate}INFO:${reset} $1"
}
success() {
  echo -e "${purple}[Aura Deployer]${reset} ${green}SUCCESS: $1${reset}"
}
warn() {
  echo -e "${purple}[Aura Deployer]${reset} ${yellow}WARNING: $1${reset}"
}
error() {
  echo -e "${purple}[Aura Deployer]${reset} ${red}ERROR: $1${reset}" >&2
}

# Print Beautiful Header Banner
echo -e ""
echo -e "${purple}======================================================================${reset}"
echo -e "   ${purple}${bold}AURA WEB | Enterprise Git Automation & Deployment Orchestrator${reset}"
echo -e "${purple}======================================================================${reset}"
echo -e "${slate}Initiating structured deployment pipeline...${reset}"
echo -e ""

# 1. Environment & Pre-flight Diagnostics
info "Verifying CLI environment and requirements..."

# Verify Git is installed
if ! command -v git &> /dev/null; then
  error "git CLI tools are not installed in the environment."
  exit 1
fi

# Verify folder is inside a Git repository
if ! git rev-parse --is-inside-work-tree &> /dev/null; then
  error "Current working directory is not a Git repository."
  echo -e "💡 To initialize: ${bold}git init && git remote add origin <your-repo-url>${reset}"
  exit 1
fi

# Verify node environment and package files exist
if [ ! -f "package.json" ]; then
  error "package.json not found in the root directory."
  exit 1
fi

# Show Current Branch Context
current_branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "detached")
git_user=$(git config user.name || echo "unconfigured")
git_email=$(git config user.email || echo "unconfigured")

info "Active Branch: ${bold}${cyan}${current_branch}${reset}"
info "Signed Git Profile: ${bold}${git_user} <${git_email}>${reset}"

# 2. Quality Control Gate (Linting & Dry Production Build)
echo -e "\n${purple}[1/5] Running Quality Control Gate...${reset}"
info "Executing local TypeScript linter verification..."
if npm run lint; then
  success "Linter completed with zero errors."
else
  error "Linter checks have failed! Run 'npm run lint' manually to fix Type errors before pushing."
  exit 1
fi

info "Executing enterprise-grade production bundle compilation..."
if npm run build; then
  success "Production-grade distribution compiled successfully."
else
  error "Build compilation failed! Production build must compile cleanly before pushing to GitHub."
  exit 1
fi

# 3. Dynamic Staging & Change Detection
echo -e "\n${purple}[2/5] Staging & Change Detection...${reset}"

git_stat=$(git status --porcelain)
if [ -z "$git_stat" ]; then
  warn "No uncommitted modifications detected in workspace."
  read -p "Do you want to force-push latest commits to origin? (y/N): " force_push_ans
  if [[ ! "$force_push_ans" =~ ^[Yy]$ ]]; then
    success "Pipeline completed. Nothing to deploy."
    exit 0
  fi
else
  echo -e "${dim}Modified files detected:${reset}"
  git status -s
  echo ""
  
  read -p "Stage select files or add all? (a=All / m=Manual review): " stage_choice
  if [[ "$stage_choice" =~ ^[Mm]$ ]]; then
    info "Launching manual stage helper. Use space to select/unselect, press Q when done."
    git add -i
  else
    info "Staging all workspace changes..."
    git add .
  fi
  success "Target distribution staged."
fi

# 4. Standardized Conventional Commits Generator
echo -e "\n${purple}[3/5] Conventional Commit Generator...${reset}"

# Selecting Commit Category
echo -e "Choose the nature of your commit:"
echo -e "  [1] ${bold}feat:${reset}      A new feature (corresponds to Minor release)"
echo -e "  [2] ${bold}fix:${reset}       A bug fix (corresponds to Patch release)"
echo -e "  [3] ${bold}docs:${reset}      Documentation adjustments only"
echo -e "  [4] ${bold}style:${reset}     Formatting, semicolons, visual layout (no logic changes)"
echo -e "  [5] ${bold}refactor:${reset}  Code restructure without adding feature or fixing bugs"
echo -e "  [6] ${bold}perf:${reset}      Performance optimization tweak"
echo -e "  [7] ${bold}build:${reset}     Build configurations, dependencies, workflows"
echo -e "  [8] ${bold}chore:${reset}     General housekeeping & small maintenance details"

while true; do
  read -p "Enter number (1-8): " type_num
  case $type_num in
    1) c_type="feat"; break;;
    2) c_type="fix"; break;;
    3) c_type="docs"; break;;
    4) c_type="style"; break;;
    5) c_type="refactor"; break;;
    6) c_type="perf"; break;;
    7) c_type="build"; break;;
    8) c_type="chore"; break;;
    *) warn "Please input a valid choice between 1 and 8.";;
  esac
done

# Setting Optional Scope
read -p "Enter the scope of this change (e.g., mailer, login, supabase, styles) [Optional - hit enter to skip]: " c_scope
if [ -n "$c_scope" ]; then
  c_scope_formatted="($c_scope)"
else
  c_scope_formatted=""
fi

# Descriptive Summary
while true; do
  read -p "Enter a brief, concise description (imperative mood, e.g., 'fix supabase audit logs'): " c_desc
  if [ -z "$c_desc" ]; then
    warn "Description cannot be empty."
  else
    break
  fi
done

full_msg="${c_type}${c_scope_formatted}: ${c_desc}"
echo -e "\nFormulated Conventional Commit Message:"
echo -e "👉 ${bold}${purple}${full_msg}${reset}\n"

# Verify GPG Signing Configuration
optional_sign_flag=""
if git config --get user.signingkey &> /dev/null; then
  info "GPG key detected in git configuration. Commit will be signed automatically."
  optional_sign_flag="-S"
else
  read -p "No GPG key registered in Git config. Continue with standard unsigned commit? (Y/n): " sign_ans
  if [[ "$sign_ans" =~ ^[Nn]$ ]]; then
    error "Deployment cancelled to ensure secure signature audit."
    exit 1
  fi
fi

# Commit execution
info "Registering commit to branch history..."
git commit $optional_sign_flag -m "$full_msg"
if [ $? -eq 0 ]; then
  success "Changes successfully committed using conventional rules."
else
  error "Git commit failed. Resolve index conflicts."
  exit 1
fi

# 5. Upstream Synchronization (Git Push)
echo -e "\n${purple}[4/5] Upstream Synchronization...${reset}"

read -p "Ensure build is synced with branch [${current_branch}]. Ready to push to GitHub? (Y/n): " push_ans
if [[ ! "$push_ans" =~ ^[Nn]$ ]]; then
  info "Pushing local commits to origin/${current_branch}..."
  git push origin "$current_branch"
  if [ $? -eq 0 ]; then
    success "Local repository successfully synchronized with GitHub remote tracked branch."
  else
    error "Git push failed! Check internet connection, branch names, and repository permissions."
    exit 1
  fi
else
  warn "Skipped direct git push. Commit registered locally only."
fi

# 6. Deployment Gateway Verification (Vercel Hook Integration)
echo -e "\n${purple}[5/5] Vercel Deployment Verification...${reset}"

# Inform about standard automatics
info "GitHub repositories linked to Vercel automatically trigger a deployment upon push to target branches (such as 'main' or 'master')."

# Check if Vercel CLI is installed locally for premium direct deploys
if command -v vercel &> /dev/null; then
  info "Vercel command line interface (CLI) detected locally."
  read -p "Would you like to trigger a direct live Vercel deploy? (y/N): " vercel_trigger_ans
  if [[ "$vercel_trigger_ans" =~ ^[Yy]$ ]]; then
    info "Launching direct Vercel production deployment..."
    vercel --prod
    if [ $? -eq 0 ]; then
      success "Vercel live deployment finalized successfully!"
    else
      error "Vercel direct deployment failed. Check local vercel authentication."
    fi
  fi
else
  info "Vercel CLI is not installed locally on this host (normal for automatic server integrations)."
  echo -e "✨ ${bold}Monitoring Instructions:${reset}"
  echo -e "  1. Navigate to your Vercel Dashboard: ${cyan}https://vercel.com/dashboard${reset}"
  echo -e "  2. Locate project associated with: ${bold}Aura Web${reset}"
  echo -e "  3. Verify that the commit (${bold}${purple}${current_branch}${reset}) is currently building."
fi

echo -e "\n${purple}======================================================================${reset}"
echo -e "       🎉 ${bold}DEPLOYMENT PROCESS COMPLETED SUCCESSFULLY!${reset}"
echo -e "${purple}======================================================================${reset}\n"
