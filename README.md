# Code test from [Labrador](https://www.thelabrador.co.uk/) and solution

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

## Feedback from Labrador

```
- His solution is too fragile, hard to read
- He should have insisted on the pdf2text library and go for regular expressions, it worked for me, also for the isupply pdf.
- If the first solution was working he should have pushed that code to git so that I'd have a look at least at that version to see progress.
```