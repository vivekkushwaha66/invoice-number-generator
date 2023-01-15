# vivekkushwaha66/invoice-number-generator

The "invoice-number-generator" library is a software tool that automatically generates invoice numbers in a specific format, "VK/22-23/1". This format includes a prefix "VK", current financial year "22-23" and counter of total invoices "1".

## Getting started 
To install it, run below command: 
`npm install @vivekkushwaha66/invoice-number-generator`

### Sample Code


    const { InvoiceNumberGenerator } = require('@vivekkushwah66/invoice-number-generator')
	invoiceNumberOptions = {
          prefix: 'VK'
        }
    const ing = new InvoiceNumberGenerator(invoiceNumberOptions).generate()

Above code should generate: "VK/22-23/1"

### Accepted Options: invoiceNumberOptions
|Option   |  Description | Default Value  |
| :------------ | :------------ | :------------ |
|prefix   | It stores the prefix of the invoice number. It can be anything like initials of shop/name. In the above example, prefix is set to VK |   INV|
|counter   | It accepts the count of previously generated invoices. It is incremented by 1. For example: you have already generate 20 invoices and now you want the next number to 21 in "INV/22-23/21"  |0   |
|century   |It respresents the current century.   |2000   |
|financialYearEndingMonth   |  Fiscal year ending month is March i.e. 3. If it changes to some different month in future. It can be changed easily |3   |


