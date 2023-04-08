import { InvoiceNumberGenerator } from '../src';
import { InvoiceNumberOptions } from '../src/interfaces/invoice-number-options.interface';

describe('invoice number generator test suite', () => {

  let invoiceNumberOptions: InvoiceNumberOptions

  beforeEach(() => {
    invoiceNumberOptions = {
      prefix: 'VK'
    }
  })

  it(`should generate invoice number without passing invoice number options`, () => {
    const ing = new InvoiceNumberGenerator().generate()
    expect(ing.length).toBeGreaterThanOrEqual(3)
  })

  it('should generate invoice number with prefix VK', () => {
    const ing = new InvoiceNumberGenerator(invoiceNumberOptions).generate()
    expect(ing).toContain('VK')
  })


  it('should generate invoice number with prefix INV', () => {
    const ing = new InvoiceNumberGenerator().generate()
    expect(ing).toContain('INV')
  })


  it('should generate invoice number containing 27', () => {
    invoiceNumberOptions.counter = 26
    const ing = new InvoiceNumberGenerator(invoiceNumberOptions).generate()
    expect(ing).toContain('27')
  })

  it('should generate invoice number if financial year ending month is greater than 12', () => {
    invoiceNumberOptions.financialYearEndingMonth = 145
    const ing = new InvoiceNumberGenerator(invoiceNumberOptions).generate()
    expect(ing.length).toBeGreaterThanOrEqual(1)
  })


  it(`should have warning, if prefix length is greater than 3`, () => {
    invoiceNumberOptions.prefix = 'FOUR'
    const ingInstance = new InvoiceNumberGenerator(invoiceNumberOptions)
    ingInstance.generate()
    expect(ingInstance.warnings.length).toBeGreaterThan(0)
  })


  it(`should contain INV as prefix on passing prefix as empty spaces`, () => {
    invoiceNumberOptions.prefix = '   '
    const ing = new InvoiceNumberGenerator(invoiceNumberOptions).generate()
    expect(ing).toContain('INV')

  })

});
