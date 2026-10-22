# Sample data

Fake data for trying out each tool. Upload the data file or directly copy and paste its contents.

| File | What it is | Try it with |
|------|------------|-------------|
| `employees.tsv` | Employee rows, tab-separated like an Excel copy. Includes empty cells, apostrophes and commas in values. | **Transform**, **Filter** by column, **Replace** `@example.com` |
| `scheduler.log` | A scheduler log with `issue with Order: N.` errors, some repeated. | **Extract** `Order: `, **Count** `[ERROR]` |
| `orders_source.txt` | Order numbers, one repeated. | **Duplicates**, **Filter** |
| `orders_target.txt` | The same orders after a "migration": one missing, one extra. | **Mismatch** against `orders_source.txt` (paste it into **Match against**) |
