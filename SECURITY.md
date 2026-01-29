# Security Policy

## Known Vulnerabilities

### xlsx Dependency (v0.18.5)

**Status:** Known vulnerabilities, awaiting update

**Issues:**
1. **Regular Expression Denial of Service (ReDoS)**
   - Severity: Moderate
   - Affected versions: < 0.20.2
   - Current version: 0.18.5

2. **Prototype Pollution**
   - Severity: Moderate  
   - Affected versions: < 0.19.3
   - Current version: 0.18.5

**Why Not Updated:**
The patched versions (0.19.3+ and 0.20.2+) are not available via npm registry. They are distributed through the SheetJS CDN which may not be accessible in all environments.

**Mitigation Steps:**

1. **Input Validation:** The application should validate and sanitize all Excel files before processing:
   ```javascript
   // Validate file size (limit to prevent DoS)
   if (file.size > 10 * 1024 * 1024) { // 10MB limit
     throw new Error('File too large');
   }
   
   // Validate file type
   if (!file.name.match(/\.(xlsx|xls|csv)$/i)) {
     throw new Error('Invalid file type');
   }
   ```

2. **Server-Side Processing:** For production use, process Excel files server-side in a sandboxed environment rather than client-side.

3. **Alternative Libraries:** Consider migrating to alternative libraries:
   - **exceljs** (v4.4.0) - Actively maintained, no known vulnerabilities
   - **read-excel-file** (v6.0.3) - Lightweight alternative
   - **hyperformula** (v3.1.1) - For formula calculations

4. **Rate Limiting:** Implement rate limiting for file uploads to prevent DoS attacks.

5. **Content Security Policy:** Use strict CSP headers to limit execution context.

## Risk Assessment

**Current Risk Level:** LOW to MODERATE

- The ReDoS vulnerability requires a specially crafted malicious Excel file
- The Prototype Pollution vulnerability requires direct access to file upload
- This is a demonstration/educational project, not processing untrusted user files in production

**Acceptable for:**
- Development and testing environments
- Internal tools with trusted users
- Educational purposes
- Proof-of-concept applications

**NOT recommended for:**
- Public-facing production applications
- Processing untrusted user uploads
- High-security environments

## Future Plans

Once SheetJS releases versions 0.19.3+ and 0.20.2+ to npm registry, the dependency will be updated immediately.

Alternative: The project may be migrated to `exceljs` library which is actively maintained and has no known security vulnerabilities.

## Reporting a Vulnerability

If you discover a security vulnerability, please email the maintainers. Do not create public issues for security vulnerabilities.

## Security Best Practices

For production deployments:

1. **Use server-side processing** for Excel files
2. **Implement file size limits** (recommended: 10MB max)
3. **Validate file types** before processing  
4. **Use virus scanning** on uploaded files
5. **Run in isolated/sandboxed environment**
6. **Implement rate limiting** on uploads
7. **Log all file operations** for audit trail
8. **Use Content Security Policy headers**
9. **Keep all dependencies updated**
10. **Regular security audits** with `npm audit`

## Updates

- **2026-01-29**: Documented xlsx vulnerabilities (v0.18.5)
- Monitoring for npm registry updates to versions 0.19.3+ and 0.20.2+

---

**Note:** This is an educational/demonstration project. For production use, please implement the security measures outlined above and consider using alternative libraries without known vulnerabilities.
