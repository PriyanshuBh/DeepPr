param (
    [string]$StartDateStr,
    [string]$EndDateStr
)

if (-not $StartDateStr) {
    $StartDateStr = Read-Host "Enter the start date (e.g., 2026-09-01)"
}
if (-not $EndDateStr) {
    $EndDateStr = Read-Host "Enter the end date (e.g., 2026-09-28)"
}

$start = [datetime]::Parse($StartDateStr)
$end = [datetime]::Parse($EndDateStr)
# Default end of day for the end date if no time provided
if ($end.TimeOfDay.TotalSeconds -eq 0) {
    $end = $end.AddHours(23).AddMinutes(59).AddSeconds(59)
}

if ($end -le $start) {
    Write-Host "End date must be after start date." -ForegroundColor Red
    exit
}

# Ensure we are in a branch, not master directly, to create a PR later
$currentBranch = git rev-parse --abbrev-ref HEAD
if ($currentBranch -eq "master" -or $currentBranch -eq "main") {
    Write-Host "Creating and switching to 'feature/initial-code-drop' branch..."
    git checkout -b feature/initial-code-drop
}

$files = git ls-files -o --exclude-standard
$fileCount = $files.Count
if ($fileCount -eq 0) {
    Write-Host "No untracked files found! (Already committed?)" -ForegroundColor Yellow
    exit
}

Write-Host "Found $fileCount files to commit." -ForegroundColor Cyan

# Generate random times between start and end
$random = New-Object System.Random
$times = @()
$totalSeconds = ($end - $start).TotalSeconds

for ($i = 0; $i -lt $fileCount; $i++) {
    $r = $random.NextDouble()
    $randomSeconds = $r * $totalSeconds
    $times += $start.AddSeconds($randomSeconds)
}

# Sort times chronologically
$times = $times | Sort-Object

# Commit files one by one with the sorted random timestamps
for ($i = 0; $i -lt $fileCount; $i++) {
    $file = $files[$i]
    $timeStr = $times[$i].ToString("yyyy-MM-dd HH:mm:ss")
    
    git add $file
    $env:GIT_COMMITTER_DATE = $timeStr
    git commit -m "Add $file" --date=$timeStr | Out-Null
    Write-Host "Committed $($file) -> $timeStr"
}

Write-Host "`nAll 41 commits have been successfully backdated and created!" -ForegroundColor Green
Write-Host "You are now ready to push to GitHub." -ForegroundColor Green
