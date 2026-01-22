# Rewst RMM One-Liner for Safe Endpoint Validation
# Copy this into your Rewst workflow's PowerShell action
#
# IMPORTANT: Replace the URL with YOUR hosted copy of the script!
# Do not use raw GitHub URLs in production.

[Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12;$s=(New-Object Net.WebClient).DownloadString('https://YOUR-TRUSTED-URL/Invoke-SafeEndpointValidation.ps1');iex $s
