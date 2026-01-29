# Security Policy

## Security Status

✅ **All Known Vulnerabilities Resolved**

This project has been updated to use secure, actively maintained libraries with no known vulnerabilities.

## Dependencies Security

### Excel Library: exceljs (v4.4.0)

**Status:** ✅ Secure - No known vulnerabilities

The project uses `exceljs` v4.4.0 for Excel file operations, which is:
- Actively maintained
- No known security vulnerabilities
- Well-tested and production-ready
- Supports both import and export of Excel files
- Handles formulas and cell styling

**Previous Issue (RESOLVED):**
- The project previously used `xlsx` v0.18.5 which had ReDoS and Prototype Pollution vulnerabilities
- **Migration completed** to `exceljs` v4.4.0 on 2026-01-29
- All functionality maintained while eliminating security risks

## Security Best Practices

For production deployments, continue to follow these guidelines:

1. **Input Validation:** Validate and sanitize all Excel files before processing:
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

2. **Server-Side Processing:** For production use, process Excel files server-side in a sandboxed environment rather than client-side when handling untrusted files.

3. **Rate Limiting:** Implement rate limiting for file uploads to prevent DoS attacks.

4. **Content Security Policy:** Use strict CSP headers to limit execution context.

5. **File Size Limits:** Enforce reasonable file size limits (recommended: 10MB max).

6. **Virus Scanning:** Scan uploaded files with antivirus software.

7. **Audit Logging:** Log all file operations for security audit trails.

## Risk Assessment

**Current Risk Level:** ✅ LOW

- All dependencies are up-to-date and secure
- No known vulnerabilities in the current dependency stack
- Follows security best practices for file handling

**Suitable for:**
- ✅ Development and testing environments
- ✅ Internal tools with trusted users
- ✅ Educational purposes
- ✅ Production applications (with proper security measures)
- ✅ Public-facing applications (with input validation and rate limiting)

## Reporting a Vulnerability

If you discover a security vulnerability, please email the maintainers. Do not create public issues for security vulnerabilities.

## Production Deployment Checklist

Before deploying to production:

- [ ] **Implement file size limits** (recommended: 10MB max)
- [ ] **Validate file types** before processing  
- [ ] **Use virus scanning** on uploaded files (if accepting user uploads)
- [ ] **Run in isolated/sandboxed environment** (for untrusted files)
- [ ] **Implement rate limiting** on uploads
- [ ] **Log all file operations** for audit trail
- [ ] **Use Content Security Policy headers**
- [ ] **Keep all dependencies updated** (`npm update`, `npm audit`)
- [ ] **Regular security audits** with `npm audit`
- [ ] **Use HTTPS** for all connections
- [ ] **Implement proper authentication** and authorization
- [ ] **Set up monitoring** and alerting for suspicious activity

## Dependency Monitoring

Run regular security audits:

```bash
# Check for vulnerabilities
npm audit

# Update dependencies
npm update

# Check for outdated packages
npm outdated
```

## Updates

- **2026-01-29**: Migrated from `xlsx` v0.18.5 to `exceljs` v4.4.0 - Resolved all known vulnerabilities
- **2026-01-29**: Initial security documentation created

---

**Note:** This project is secure for production use when following the security best practices outlined above. The migration to `exceljs` eliminates all previously known security vulnerabilities.
