# Complete AI Literacy Translation Fix Script
# This script will:
# 1. Add missing translation keys for skills and paths
# 2. Move learningPaths inside component to access t() function
# 3. Update all hardcoded strings to use translations

Write-Host "🔧 Starting AI Literacy Translation Fix..." -ForegroundColor Cyan

# Step 1: Add missing translation keys to English file
Write-Host "`n📝 Adding missing keys to EN translations..." -ForegroundColor Yellow

$enFile = "locales\en\aiLiteracy.ts"
$enContent = Get-Content $enFile -Raw -Encoding UTF8

# Add the missing skill keys before the closing }
$newEnKeys = @"
  skillAIBasics: "AI Basics",
  skillPromptWriting: "Prompt Writing", 
  skillToolSelection: "Tool Selection",
  skillPrivacy: "Privacy Awareness",
  skillAdvancedPrompts: "Advanced Prompts",
  skillWorkflowIntegration: "Workflow Integration",
  skillAssessmentDesign: "Assessment Design",
  skillParentCommunication: "Parent Communication",
  skillCurriculumDesign: "Curriculum Design",
  skillEthicalAI: "Ethical AI",
  skillLeadershipAI: "AI Leadership",
  skillPolicyDevelopment: "Policy Development",
"@

# Insert before the closing brace
$enContent = $enContent -replace '};\s*$', "$newEnKeys`n};"
$enContent | Set-Content $enFile -NoNewline -Encoding UTF8

Write-Host "✅ Updated EN translations" -ForegroundColor Green

# Step 2: Add missing translation keys to German file
Write-Host "`n📝 Adding missing keys to DE translations..." -ForegroundColor Yellow

$deFile = "locales\de\aiLiteracy.ts" 
$deContent = Get-Content $deFile -Raw -Encoding UTF8

# Add the missing skill keys in German
$newDeKeys = @"
  skillAIBasics: "KI-Grundlagen",
  skillPromptWriting: "Prompt-Erstellung",
  skillToolSelection: "Tool-Auswahl", 
  skillPrivacy: "Datenschutz-Bewusstsein",
  skillAdvancedPrompts: "Erweiterte Prompts",
  skillWorkflowIntegration: "Workflow-Integration",
  skillAssessmentDesign: "Bewertungsdesign",
  skillParentCommunication: "Elternkommunikation",
  skillCurriculumDesign: "Lehrplan-Design",
  skillEthicalAI: "Ethische KI",
  skillLeadershipAI: "KI-Führung",
  skillPolicyDevelopment: "Richtlinienentwicklung",
"@

# Insert before the closing brace
$deContent = $deContent -replace '};\s*$', "$newDeKeys`n};"
$deContent | Set-Content $deFile -NoNewline -Encoding UTF8

Write-Host "✅ Updated DE translations" -ForegroundColor Green

# Step 3: Update AI Literacy Client
Write-Host "`n🔧 Updating AI Literacy Client..." -ForegroundColor Yellow

$clientFile = "app\ai-literacy\ai-literacy-client.tsx"
$clientContent = Get-Content $clientFile -Raw -Encoding UTF8

# Remove the old learningPaths array (lines ~31-80)
$clientContent = $clientContent -replace 'const learningPaths = \[[\s\S]*?\];\s*(?=const|export)', ''

# Create the new learningPaths array that uses t() function
$newLearningPaths = @"
  // Learning paths data - now uses translations
  const learningPaths = [
    {
      id: "beginner",
      title: t("beginnerTitle"),
      description: t("beginnerDesc"),
      duration: "8-12 hours",
      courses: 5,
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      skills: [
        t("skillAIBasics"),
        t("skillPromptWriting"),
        t("skillToolSelection"),
        t("skillPrivacy"),
      ],
    },
    {
      id: "intermediate", 
      title: t("intermediateTitle"),
      description: t("intermediateDesc"),
      duration: "12-16 hours",
      courses: 7,
      icon: GraduationCap,
      color: "from-purple-500 to-indigo-500",
      skills: [
        t("skillAdvancedPrompts"),
        t("skillWorkflowIntegration"),
        t("skillAssessmentDesign"),
        t("skillParentCommunication"),
      ],
    },
    {
      id: "advanced",
      title: t("advancedTitle"),
      description: t("advancedDesc"),
      duration: "16-20 hours", 
      courses: 10,
      icon: Award,
      color: "from-orange-500 to-red-500",
      skills: [
        t("skillCurriculumDesign"),
        t("skillEthicalAI"),
        t("skillLeadershipAI"), 
        t("skillPolicyDevelopment"),
      ],
    },
  ];

"@

# Insert the new learningPaths after the hook declarations
$insertPoint = 'const \{ language \} = useLanguage\(\);'
$clientContent = $clientContent -replace "($insertPoint)", "`$1`n`n$newLearningPaths"

# Save the updated file
$clientContent | Set-Content $clientFile -NoNewline -Encoding UTF8

Write-Host "✅ Updated AI Literacy Client" -ForegroundColor Green

Write-Host "`n🎉 AI Literacy Translation Fix Complete!" -ForegroundColor Cyan
Write-Host "📋 What was fixed:" -ForegroundColor White
Write-Host "  • Added 12 new skill translation keys (EN & DE)" -ForegroundColor White
Write-Host "  • Moved learningPaths inside component" -ForegroundColor White  
Write-Host "  • All hardcoded strings now use t() translations" -ForegroundColor White
Write-Host "`n💾 Ready to commit and test!" -ForegroundColor Green
