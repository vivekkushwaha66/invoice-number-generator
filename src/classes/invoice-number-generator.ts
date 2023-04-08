import { DEFAULT_CENTURY, DEFAULT_FINACIAL_YEAR_ENDING_MONTH, DEFAULT_PREFIX, IDEAL_INVOICE_NUMBER_PREFIX_LENGTH } from "../constants/default.constants"
import { InvoiceNumberOptions } from "../interfaces/invoice-number-options.interface"

/**
 * InvoiceNumberGenerator
 */
export class InvoiceNumberGenerator {
    private _prefix = DEFAULT_PREFIX
    private _currentFinancialYear = 0
    private _counter = 0
    private _century = DEFAULT_CENTURY
    private _financialYearEndingMonth = DEFAULT_FINACIAL_YEAR_ENDING_MONTH
    warnings: string[] = []

    /**
     * Contructor function sets default values and calculates current financial year
     * @param option is of type InvoiceNumberOptions
     */
    constructor(option?: InvoiceNumberOptions) {
        if (option) {
            this._prefix = option.prefix && option.prefix.trim() !== '' ? option.prefix : this._prefix
            this._counter = option.counter ? option.counter : this._counter
            this._century = option.century ? option.century : this._century
            this._financialYearEndingMonth = option.financialYearEndingMonth ? option.financialYearEndingMonth : this._financialYearEndingMonth
            this._financialYearEndingMonth = this._financialYearEndingMonth >= 12 ? this._financialYearEndingMonth % 12 : this._financialYearEndingMonth
        }
        this.setCurrentFinancialYear()
        this.checkPrefixWarning(this._prefix)
    }

    /**
     * Set's current fincancial year
     */
    private setCurrentFinancialYear() {
        const date = new Date()
        const currentMonth = date.getMonth() + 1
        const currentYear = date.getFullYear() % this._century
        this._currentFinancialYear = currentMonth < this._financialYearEndingMonth ? currentYear - 1 : currentYear
    }


    private checkPrefixWarning(prefix: string) {

        if (prefix && prefix.length > 3) {
            this.warnings.push('Ideal length of prefix should be less than or equal to 3')
        }

    }

    public generate(): string {
        if (this.warnings.length > IDEAL_INVOICE_NUMBER_PREFIX_LENGTH) {
            console.warn(`Invoice number generated with warning - ${this.warnings.join('\n')}`)
        }
        const financialYear = `${this._prefix.toUpperCase()}/${this._currentFinancialYear}-${this._currentFinancialYear + 1}/${this._counter + 1}`
        return financialYear
    }
}