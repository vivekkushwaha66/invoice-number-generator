import { DEFAULT_CENTURY, DEFAULT_FINACIAL_YEAR_ENDING_MONTH, DEFAULT_PREFIX } from "../constants/default.constants"
import { InvoiceNumberOptions } from "../interfaces/invoice-number-options.interface"

export class InvoiceNumberGenerator {
    private _prefix = DEFAULT_PREFIX
    private _currentFinancialYear = 0
    private _counter = 0
    private _century = DEFAULT_CENTURY
    private _financialYearEndingMonth = DEFAULT_FINACIAL_YEAR_ENDING_MONTH
    warnings: string[] = []

    constructor(option?: InvoiceNumberOptions) {
        this._prefix = option ? option.prefix ? option.prefix : this._prefix : this._prefix
        if (option) {
            this._counter = option.counter ? option.counter : this._counter
            this._century = option.century ? option.century : this._century
            this._financialYearEndingMonth = option.financialYearEndingMonth ? option.financialYearEndingMonth : this._financialYearEndingMonth
            this._financialYearEndingMonth >= 12 ? this._financialYearEndingMonth % 12 : this._financialYearEndingMonth
        }
        this.setCurrentFinancialYear()
        this.checkPrefixWarning(this._prefix)
    }

    private setCurrentFinancialYear() {
        const date = new Date()
        const currentMonth = date.getMonth() + 1
        const currentYear = date.getFullYear() % this._century
        this._currentFinancialYear = currentMonth > this._financialYearEndingMonth ? currentYear + 1 : currentYear - 1
    }

    private checkPrefixWarning(prefix: string) {
        if (prefix && prefix.length > 3) {
            this.warnings.push('Ideal length of prefix should be less than or equal to 3')
        }
    }

    public generate(): string {
        if (this.warnings.length > 0) {
            console.warn(`Invoice number generated with warning - ${this.warnings.join('\n')}`)
        }
        return `${this._prefix.toUpperCase()}/${this._currentFinancialYear}-${this._currentFinancialYear + 1}/${this._counter + 1}`
    }
}