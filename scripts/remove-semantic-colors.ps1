$themeFiles = Get-ChildItem -Path themes\*-color-theme.json
$fixed = 0

foreach ($file in $themeFiles) {
    $content = Get-Content $file.FullName -Raw
    $json = $content | ConvertFrom-Json
    
    if ($json.PSObject.Properties.Name -contains 'semanticTokenColors') {
        $json.PSObject.Properties.Remove('semanticTokenColors')
        $json | ConvertTo-Json -Depth 100 | Set-Content $file.FullName -NoNewline
        Write-Host "Fixed: $($file.Name)"
        $fixed++
    }
}

Write-Host "`nRemoved semanticTokenColors from $fixed themes"
