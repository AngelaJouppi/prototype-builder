import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Page } from '../App';

interface CartProps {
  items: any[];
  onNavigate: (page: Page) => void;
}

export function Cart({ items, onNavigate }: CartProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [playerQuantities, setPlayerQuantities] = useState<{[key: string]: number}>({});

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const updateQuantity = (itemIndex: number, playerIndex: number, quantity: number) => {
    const key = `${itemIndex}-${playerIndex}`;
    setPlayerQuantities({
      ...playerQuantities,
      [key]: Math.max(0, quantity)
    });
  };

  const getPlayerQuantity = (itemIndex: number, playerIndex: number): number => {
    const key = `${itemIndex}-${playerIndex}`;
    return playerQuantities[key] ?? 1;
  };

  const calculateItemTotal = (item: any, itemIndex: number): number => {
    return item.players.reduce((sum: number, player: any, playerIndex: number) => {
      const quantity = getPlayerQuantity(itemIndex, playerIndex);
      return sum + (player.itemPrice * quantity);
    }, 0);
  };

  const getTotalQuantity = (item: any, itemIndex: number): number => {
    return item.players.reduce((sum: number, _: any, playerIndex: number) => {
      return sum + getPlayerQuantity(itemIndex, playerIndex);
    }, 0);
  };

  const handleRemoveItem = (index: number) => {
    if (confirm('Remove this item from cart?')) {
      alert('Item removed from cart (would update state in production)');
    }
  };

  const cartTotal = items.reduce((sum, item, index) => sum + calculateItemTotal(item, index), 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-card border-b border-border">
          <div className="max-w-[1400px] mx-auto px-6 py-6">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 text-accent hover:underline mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <h1>Shopping Cart</h1>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 py-12 text-center">
          <p className="text-muted-foreground mb-4">Your cart is empty</p>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-[--radius-button] hover:opacity-90"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => onNavigate('prototype-home')}
                className="text-accent hover:underline mb-2 block"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                ← Prototype Home
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 text-accent hover:underline mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </button>
              <h1>Shopping Cart</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="space-y-4">
          {items.map((item, itemIndex) => {
            const isExpanded = expandedItems.has(itemIndex);
            const itemTotal = calculateItemTotal(item, itemIndex);
            const totalQty = getTotalQuantity(item, itemIndex);

            return (
              <div key={itemIndex} className="bg-card border border-border rounded-[--radius] overflow-hidden">
                {/* Collapsed Header Row */}
                <div className="grid grid-cols-[80px_1fr_120px_120px_120px_120px] gap-4 p-4 items-center">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-[--radius] overflow-hidden bg-muted">
                    <ImageWithFallback
                      src={item.players[0]?.thumbnail}
                      alt={item.jobName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Summary Stack */}
                  <div className="space-y-1">
                    <p className="font-[--font-weight-semibold]">Item {itemIndex + 1}</p>
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>{item.serviceType}</p>
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>Easy View LTE® Team Builder</p>
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>Shipping from: MI</p>
                    <button
                      onClick={() => handleRemoveItem(itemIndex)}
                      className="text-destructive hover:underline flex items-center gap-1"
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      <Trash2 className="w-3 h-3" />
                      Remove item
                    </button>
                  </div>

                  {/* Quantity */}
                  <div className="text-center">
                    <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-sm)' }}>Quantity</p>
                    <p>{totalQty}</p>
                  </div>

                  {/* Unit of Measure */}
                  <div className="text-center">
                    <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-sm)' }}>Unit of Measure</p>
                    <button
                      onClick={() => toggleExpanded(itemIndex)}
                      className="text-accent hover:underline"
                    >
                      See Details
                    </button>
                  </div>

                  {/* Item Price */}
                  <div className="text-center">
                    <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-sm)' }}>Item Price</p>
                    <button
                      onClick={() => toggleExpanded(itemIndex)}
                      className="text-accent hover:underline"
                    >
                      See Details
                    </button>
                  </div>

                  {/* Total Price */}
                  <div className="text-center">
                    <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-sm)' }}>Total Price</p>
                    <p className="font-[--font-weight-semibold]">${itemTotal.toFixed(2)}</p>
                    <button
                      onClick={() => toggleExpanded(itemIndex)}
                      className="text-accent hover:underline flex items-center gap-1 mx-auto mt-1"
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      {isExpanded ? 'Hide' : 'Details'}
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="border-t border-border p-4 bg-muted/30">
                    <h3 className="mb-4">Roster: {item.rosterName || 'Team'}</h3>
                    
                    {/* Player Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full" style={{ fontSize: 'var(--text-sm)' }}>
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-3 py-2 text-left">Player #</th>
                            <th className="px-3 py-2 text-left">Player Name</th>
                            <th className="px-3 py-2 text-left">Thumbnail</th>
                            <th className="px-3 py-2 text-left">Submission ID</th>
                            <th className="px-3 py-2 text-left">Design ID</th>
                            <th className="px-3 py-2 text-center">Quantity</th>
                            <th className="px-3 py-2 text-center">Unit of Measure</th>
                            <th className="px-3 py-2 text-right">Item Weight</th>
                            <th className="px-3 py-2 text-right">Item Price</th>
                            <th className="px-3 py-2 text-right">Discount Tool</th>
                            <th className="px-3 py-2 text-right">Extended Price</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border bg-card">
                          {item.players.map((player: any, playerIndex: number) => {
                            const quantity = getPlayerQuantity(itemIndex, playerIndex);
                            const extendedPrice = player.itemPrice * quantity;

                            return (
                              <tr key={playerIndex}>
                                <td className="px-3 py-2">#{player.playerNumber}</td>
                                <td className="px-3 py-2">{player.playerName}</td>
                                <td className="px-3 py-2">
                                  <div className="w-12 h-12 rounded-[--radius-sm] overflow-hidden bg-muted">
                                    <ImageWithFallback
                                      src={player.thumbnail}
                                      alt={player.playerName}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </td>
                                <td className="px-3 py-2">{item.tbParentId}</td>
                                <td className="px-3 py-2">{player.designId}</td>
                                <td className="px-3 py-2">
                                  <input
                                    type="number"
                                    min="0"
                                    value={quantity}
                                    onChange={(e) => updateQuantity(itemIndex, playerIndex, parseInt(e.target.value) || 0)}
                                    className="w-16 px-2 py-1 border border-border rounded-[--radius-sm] text-center"
                                  />
                                </td>
                                <td className="px-3 py-2 text-center">{player.unitOfMeasure}</td>
                                <td className="px-3 py-2 text-right text-muted-foreground">-</td>
                                <td className="px-3 py-2 text-right">${player.itemPrice.toFixed(2)}</td>
                                <td className="px-3 py-2 text-right text-muted-foreground">-</td>
                                <td className="px-3 py-2 text-right font-[--font-weight-semibold]">
                                  ${extendedPrice.toFixed(2)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot className="bg-muted font-[--font-weight-semibold]">
                          <tr>
                            <td colSpan={5} className="px-3 py-2 text-right">Totals:</td>
                            <td className="px-3 py-2 text-center">{totalQty}</td>
                            <td className="px-3 py-2 text-center">{item.players[0]?.unitOfMeasure}</td>
                            <td className="px-3 py-2"></td>
                            <td className="px-3 py-2"></td>
                            <td className="px-3 py-2"></td>
                            <td className="px-3 py-2 text-right">${itemTotal.toFixed(2)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Cart Summary */}
        <div className="mt-8 bg-card border border-border rounded-[--radius] p-6 max-w-md ml-auto">
          <h2 className="mb-4">Cart Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              <span>Shipping:</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between font-[--font-weight-semibold]">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => alert('Proceeding to checkout (not implemented in prototype)')}
            className="w-full mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-[--radius-button] hover:opacity-90 transition-opacity"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
