# labrador-test

## Usage

```
node parse.js file.pdf
```

## Comments

This took me about 3 hours in total. Initially I attempted to convert the PDF
to text (using pdf-parser) and find the MPAN using a regular expression, but
then found that `isupply.pdf` has out-of-order elements. So I switched to using
`pdf2json`, finding the "S" letter from the MPAN and then finding the actual
sections by looking at the coordinates.

This solution is fragile and will probably break if the MPAN is much smaller or
bigger than in the provided PDF files. This could be solved by dynamically
calculating expected offsets from the size of "S".