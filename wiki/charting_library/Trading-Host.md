:chart: All content on this page applies to the [Trading Terminal](wiki/charting_library/Trading-Terminal.md) only.

Trading Host is an API for interaction between [Broker API](wiki/charting_library/Broker-API.md) and the Chart Trading Subsystem. Its main purpose is to exchange information between our charts and your trading adapter. In terms of `JS`, it is an `object` with a set of functions. Here is the list of Hosts's **methods**.

## Commands

### showOrderDialog(order, handler, focus) : Promise

1. `order` to be placed or modified
1. `handler` is a function to process buy/sell/modify. It should return Promise
1. `focus` - [Focus constant](wiki/charting_library/Trading-Objects-and-Constants.md#orderticketfocuscontrol).

Shows standard order dialog to create or modify an order and executes handler if Buy/Sell/Modify is pressed.

### showCancelOrderDialog(orderId, handler) : Promise

1. `orderId` ID of an order to be cancelled
1. `handler` is a function to process cancellation. It should return Promise

Shows a confirmation dialog and executes handler if YES/OK is pressed.

### showCancelMultipleOrdersDialog(symbol, side, qty, handler) : Promise

1. `symbol` of orders to be cancelled
1. `side` - side of orders to be cancelled
1. `qty` - amount of orders to be cancelled
1. `handler` is a function to process cancellation. It should return Promise

Shows a confirmation dialog and executes handler if YES/OK is pressed.

### showClosePositionDialog([positionId](wiki/charting_library/Trading-Objects-and-Constants.md#position), handler) : Promise

1. `positionId` identifier of a position to be closed
1. `handler` is a function to process position close. It should return Promise

Shows a confirmation dialog and executes handler if YES/OK is pressed.

### showReversePositionDialog([position](wiki/charting_library/Trading-Objects-and-Constants.md#position), handler) : Promise

1. `position` to be reversed
1. `handler` is a function to process position reverse. It should return a Promise

Shows a confirmation dialog and executes handler if YES/OK is pressed.

### showPositionBracketsDialog([position](wiki/charting_library/Trading-Objects-and-Constants.md#position), [brackets](wiki/charting_library/Trading-Objects-and-Constants.md#brackets), focus, handler) : Promise

1. `position` to be modified
1. `brackets` (optional) new [brackets](wiki/charting_library/Trading-Objects-and-Constants.md#brackets)
1. `focus` - [Focus constant](wiki/charting_library/Trading-Objects-and-Constants.md#orderticketfocuscontrol).
1. `handler` is a function to process modification of brackets. It should return Promise

Shows a default edit brackets dialog and executes handler if MODIFY is pressed.

### activateBottomWidget : Promise

Opens the bottom panel and switches the tab to Trading.

### showTradingProperties()

Shows the properties dialog, switches current tab to Trading.

### showNotification(title, text, type)

Displays a notification. Type can be `1` - success or `0` - error.

### triggerShowActiveOrders()

Triggers show active orders.

### numericFormatter(decimalPlaces)

Returns a [Formatter](wiki/charting_library/Trading-Objects-and-Constants.md#formatter) with the specified number of decimal places.

### defaultFormatter(symbol)

Returns a default [Formatter](wiki/charting_library/Trading-Objects-and-Constants.md#formatter) formatter for the specified instrument. This formatter is created based on [SymbolInfo](wiki/charting_library/Symbology.md#symbolinfo-structure).

### factory

`factory` is an object property. Its functions are described below.

### factory.createDelegate

Creates a [Delegate](wiki/charting_library/Delegate.md) object.

### factory.createWatchedValue

Creates a [WatchedValue](wiki/charting_library/WatchedValue.md) object.

### symbolSnapshot(symbol) : Promise

Returns quotes of a symbol.

## Getters and Setters

### floatingTradingPanelVisibility: [WatchedValue](wiki/charting_library/WatchedValue.md)

Returns whether floatingTradingPanel is visible or not.

### showPricesWithZeroVolume: [WatchedValue](wiki/charting_library/WatchedValue.md)

Returns whether levels with empty volume (between min and max volume levels) are collapsed or not.

### silentOrdersPlacement: [WatchedValue](wiki/charting_library/WatchedValue.md)

Returns if orders can be sent to the broker without showing the order ticket.

### suggestedQty() : Object

Returned object properties:

1. value - use it to get the current value. It returns Promise.
1. setValue - use it to set new value
1. changed : [Subscription](wiki/charting_library/Subscription.md)

It is to synchronize quantity in the Floating Trading Panel and in the dialogs.

### setButtonDropdownActions(actions)

Bottom Trading Panel has a button with a list of dropdown items. This method can be used to replace existing items.

1. `actions` is an array of [ActionMetainfo](wiki/charting_library/Trading-Objects-and-Constants.md#actionmetainfo), each of them representing one dropdown item.

### defaultContextMenuActions()

Provides default buy/sell, show properties actions to be returned as a default by [chartContextMenuActions](wiki/charting_library/Broker-API.md#chartcontextmenuactionse).

### defaultDropdownMenuActions(options)

Provides default dropdown list of actions. You can use default actions in [setButtonDropdownActions](#setButtonDropdownActionsactions).
You can add/remove default action from the result using `options`:

1. `showFloatingToolbar`: boolean;
1. `tradingProperties`: boolean;
1. `selectAnotherBroker`: boolean;
1. `disconnect`: boolean;

## Data Updates

The usage of these methods is required to notify the chart that it needs to update information.

### orderUpdate([order](wiki/charting_library/Trading-Objects-and-Constants.md#order))

Call this method when an order is added or changed.

### orderPartialUpdate([order](wiki/charting_library/Trading-Objects-and-Constants.md#order))

Call this method when an order is not changed, but the fields that you added to the order object to display in the Account Manager are changed.
It should be used only if you want to display custom fields in the [Account Manager](wiki/charting_library/Account-Manager.md).

### positionUpdate ([position](wiki/charting_library/Trading-Objects-and-Constants.md#position))

Call this method when a position is added or changed.

### positionPartialUpdate ([position](wiki/charting_library/Trading-Objects-and-Constants.md#position))

Call this method when a position is not changed, but fields that you added to the position object to display in the Account Manager are changed.
It should be used only if you want to display custom fields in the [Account Manager](wiki/charting_library/Account-Manager.md).

### executionUpdate([execution](wiki/charting_library/Trading-Objects-and-Constants.md#execution))

Call this method when an execution is added.

### fullUpdate()

Call this method when all data has been changed. For example, user account has been changed.

### plUpdate(positionId, pl)

Call this method when a broker connection has received a PL update. This method should be used when `supportPLUpdate` flag is set in `configFlags`.

### equityUpdate(equity)

Call this method when a broker connection has received an equity update. This method is required by the standard order dialog.

### tradeUpdate ([trade](wiki/charting_library/Trading-Objects-and-Constants.md#trade))

Call this method when a trade is added or changed.

### tradePartialUpdate ([trade](wiki/charting_library/Trading-Objects-and-Constants.md#trade))

Call this method when a trade is not changed, but fields that you added to the trade object to display in the Account Manager are changed.

### tradePLUpdate(tradeId, pl)

Call this method when a broker connection has received a trade PL update.
