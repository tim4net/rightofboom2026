# Rewst Workflows & Crates

Resources for automating endpoint security validation in Rewst.

---

## Notify on Conditional Access Policy Changes Crate

Monitor and alert on CA policy changes in your Microsoft 365 environment.

**Documentation:** [Rewst Crate Docs](https://docs.rewst.help/documentation/crates/existing-crate-documentation/notify-on-conditional-access-policy-changes-crate)

**Install from Rewst Marketplace:**
1. Navigate to **Crates > Crate Marketplace**
2. Search for "Conditional Access" or "CA Policy"
3. Click on the crate to view details
4. Ensure required integrations show green (Microsoft Graph)
5. Click **Unpack Crate**
6. Follow any on-screen configuration prompts

---

## Endpoint Posture Checks Workflow Bundle

This workflow validates endpoint security posture using safe, non-destructive checks.

**Download:** [Endpoint_Posture_Checks.bundle.json](https://github.com/tim4net/rightofboom2026/raw/main/public/resources/bundles/Endpoint_Posture_Checks.bundle.json)

### Import Instructions

1. Download the `.bundle.json` file above
2. In Rewst, navigate to **Automations > Workflows**
3. Click **Import Bundle** (top right corner)
4. Drag and drop the downloaded file into the upload dialog
5. Click **Submit**

### Required Integrations

Before the workflow will function, ensure these integrations are configured:
- Microsoft Graph API (for Entra ID / Azure AD)
- Your RMM platform (Datto, ConnectWise, etc.)

### Post-Import Setup

1. Open the imported workflow
2. Review and update any organization variables
3. Configure triggers as needed for your environment
4. Test on a single endpoint before broad deployment

---

## Additional Resources

- [Rewst Workflows Documentation](https://docs.rewst.help/documentation/automations/workflows)
- [Rewst Crates Documentation](https://docs.rewst.help/documentation/crates)
- [PowerShell Scripts](/public/resources/scripts/) - Companion scripts for endpoint validation
