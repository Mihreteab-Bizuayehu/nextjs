'use client'
import { useCartService } from '@/lib/hooks/useCartStore'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Menu = () => {
    const [mount, setMount] = useState(false);
    const { items } = useCartService();
    useEffect(() => {
        setMount(true)
    }, [])
  return (
    <div>
      <ul className="flex items-stretch">
        <li>
          <Link className="btn btn-ghost rounded-btn" href="/cart">
            Cart{' '}
            {mount && items.length !== 0 && (
              <div className="badge badge-secondary">
                {items.reduce((a, i) => a + i.quantity, 0)}{' '}
              </div>
            )}
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="btn btn-ghost rounded-btn"
          >
            Sign in
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Menu