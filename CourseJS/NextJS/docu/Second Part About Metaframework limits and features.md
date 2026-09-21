_It is cumbersome to represent complex business logic in this meta-framework. It has intrinsic limits, e.g. no built-in structure for domain logic and no background jobs, which may require NestJS or BullMQ._
Business rules must hold no matter who calls the code. In Next.js, this logic tends to get scattered across many Server Actions. In a typical C# backend with a domain model, it lives in one place:
``` c#
namespace Shop.Domain; // file-scoped namespace

public enum OrderStatus { Draft, Paid, Shipped }

public record OrderLine(string Sku, decimal Price, int Quantity);

public class Order
{
	private readonly List<OrderLine> _lines = new();

	public Guid Id { get; } = Guid.NewGuid();
	public OrderStatus Status { get; private set; } = OrderStatus.Draft;
	public IReadOnlyList<OrderLine> Lines => _lines;
	public decimal Total => _lines.Sum(l => l.Price * l.Quantity);

	public void AddLine(string sku, decimal price, int quantity)
	{
		if (Status != OrderStatus.Draft)
		{
			throw new InvalidOperationException("Only draft orders can be modified.");
		}
		if (quantity <= 0)
		{
			throw new ArgumentOutOfRangeException(nameof(quantity), "Quantity must be positive.");
		}

		_lines.Add(new OrderLine(sku, price, quantity));
	}

	public void MarkPaid()
	{
		if (Status != OrderStatus.Draft)
		{
			throw new InvalidOperationException("Only draft orders can be paid.");
		}
		if (_lines.Count == 0)
		{
			throw new InvalidOperationException("Cannot pay an empty order.");
		}

		Status = OrderStatus.Paid;
	}
}
```

An application service coordinates several objects inside one database transaction. Either everything succeeds or nothing is saved:
``` c#
namespace Shop.Application;

public class CheckoutService
{
    private readonly ShopDbContext _db;

    public CheckoutService(ShopDbContext db) => _db = db;

    public async Task CheckoutAsync(Guid orderId)
    {
        await using var tx = await _db.Database.BeginTransactionAsync();

        var order = await _db.Orders
            .Include(o => o.Lines)
            .SingleAsync(o => o.Id == orderId);

        foreach (var line in order.Lines)
        {
            var stock = await _db.Stock.SingleAsync(s => s.Sku == line.Sku);
            stock.Reserve(line.Quantity); // throws if not enough stock
        }

        order.MarkPaid();

        await _db.SaveChangesAsync();
        await tx.CommitAsync();
    }
}
```

_`template.tsx` wraps its child pages exactly like `layout.tsx` does. The only difference: a layout is **kept** when you navigate between its child pages, while a template is **thrown away and created anew** (remounted). Remounting means React removes the old DOM and component state and builds everything fresh, so `useState` starts at its initial value and `useEffect` runs again._

``` tsx
// ─── app/demo/counter.tsx ───────────────────────────────
'use client'

import { useState } from 'react'

export function Counter({ label }: { label: string }) {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount((c) => c + 1)}>
      {label}: {count}
    </button>
  )
}

// ─── app/demo/layout.tsx ────────────────────────────────
// Stays mounted while navigating between /demo and /demo/other.
import Link from 'next/link'
import type { ReactNode } from 'react'
import { Counter } from './counter'

export default function DemoLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <nav>
        <Link href="/demo">Page A</Link> | <Link href="/demo/other">Page B</Link>
      </nav>
      <Counter label="Layout" />
      {children}
    </section>
  )
}

// ─── app/demo/template.tsx ──────────────────────────────
// Remounted on every navigation between /demo and /demo/other.
import type { ReactNode } from 'react'
import { Counter } from './counter'

export default function DemoTemplate({ children }: { children: ReactNode }) {
  return (
    <div>
      <Counter label="Template" />
      {children}
    </div>
  )
}
```

``` tsx
// ─── app/demo/page.tsx ──────────────────────────────────
export default function PageA() {
  return <p>Page A</p>
}

// ─── app/demo/other/page.tsx ────────────────────────────
export default function PageB() {
  return <p>Page B</p>
}

// ─── What Next.js renders (simplified) ──────────────────
<DemoLayout>
  <DemoTemplate key={route}>
    {/* <PageA /> or <PageB /> */}
  </DemoTemplate>
</DemoLayout>
```

**How to demo it**
1. Open `/demo` and click both buttons a few times.
2. Click "Page B".
3. The Layout counter keeps its value, and the Template counter is back at 0.