# Privacy Policy - Beta (project-level guidance)

This project collects minimal telemetry and analytics only when explicitly enabled by the maintainer and with user consent. The repository includes analytics for production deployments only. The following practices are required:

- Opt-in: Users must be presented with an explicit consent prompt before any analytics or media capture is enabled.
- No covert collection: The codebase must never enable cameras, microphones, or other sensors without clear, documented consent and an explicit permission flow.
- Environment gating: Analytics are disabled by default in development; enable them via the build-time environment variable `NEXT_PUBLIC_ENABLE_ANALYTICS=1`.
- Data minimization: Only collect fields strictly necessary for the feature (avoid raw media unless legally reviewed and consented).
- Retention & deletion: Specify how long telemetry is retained and how users can request deletion.
- Legal review: Consult legal/compliance for jurisdiction-specific rules (GDPR, ePrivacy, wiretap laws).

If you need a formal privacy policy for public deployments, adapt this file into a consumer-facing policy and include it in deployments.
