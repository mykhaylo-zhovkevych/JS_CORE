export type SupportRequest = {
    id: string;
    severity: RequestSeverity;
    description: string;
}

// const enums
export const enum RequestSeverity {
    Low = "LOW",
    Medium = "MEDIUM",
    High = "HIGH",
    Critical = "CRITICAL"
}

export function isCritical(request: SupportRequest) {
    return request.severity === RequestSeverity.Critical;
}

export function convertSeverityToLabel(severity: number) {
    switch (severity) {
        case 0:
            return RequestSeverity.Low;
        case 1:
            return RequestSeverity.Medium;
        case 2:
            return RequestSeverity.High;
        case 3:
            return RequestSeverity.Critical;
        default:
            throw new Error(`Invalid severity level: ${severity}`);
    }
}

export enum InternalErrors {
    InvalidPrompt = 1001,
    ContextWindowOverflow = 1004,
    ModelOverlaod = 1420,
    EthicalGuardrailTriggered = 2233,
    TokenLimitExceeded = 2401,
    SelfAwarenessAchieved = 9999,
}

export function getErrorLabel(errorCode: InternalErrors) {
    const value = InternalErrors[errorCode];
    if (value == null) return "Unknown error";
    return `${errorCode}: ${value}`;
}

// Unions are often used instead of enums
// because they only care about restricting the values, not about the runtime representation
// with enums more complexity can be added

