import { useCallback } from "react";

type validationRule = {
    fieldName: string;
    pattern: RegExp;
    errorMessage: string;
}

type validationResult = {
    fieldName: string;
    errorMessage: string;
}

export default function useFormValidation() {
    // check value agains pattern and returns error message or true if valid
    const validateField = useCallback((
        value: string,
        pattern: RegExp,
        errorMessage: string): boolean | string => {
        if (!pattern.test(value)) {
            return errorMessage;
        }
        return true;
    }, [])

    // loop through all validation rules and validate each field, return array of errors or empty array if all valid
    const validateAllFields = useCallback((validationRules: validationRule[]): validationResult[] => {
        const validationResults: validationResult[] = [];
        validationRules.forEach(rule => {
            const field = document.querySelector(`[name="${rule.fieldName}"]`) as HTMLInputElement;
            if (!field)
                return

            const fieldResult = validateField(field.value, rule.pattern, rule.errorMessage);
            if (fieldResult !== true) {
                validationResults.push({ fieldName: rule.fieldName, errorMessage: String(fieldResult) });
            }
        });
        return validationResults;
    }, [])

    const focusFirstInvalidField = useCallback((validationResults: validationResult[]) => {
        if (validationResults.length > 0) {
            const firstInvalidField = document.querySelector(`[name="${validationResults[0].fieldName}"]`) as HTMLInputElement;
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
        }
    }, [])

    return { validateAllFields, focusFirstInvalidField }
}
/**
 * login: create object of (fieldname, pattern, errormessage, value, )
 */