// Exercise 27: Stock Ticker
// Let's try an easier question. Let's say we have a collection of all of the prices for NASDAQ stocks over time. Every time the price of a stock changes on the NASDAQ ticker an entry is added to this collection. Let's say that ten days ago you bought shares in Microsoft, and now you want to print all of the MSFT share prices since then. Filter the collection for MSFT trades starting from ten days ago and print each price record (including the time stamp) using the print() function. Note: this is not a trick question. It's as easy as it seems.

// The pricesNASDAQ collection looks something like this...
// var pricesNASDAQ = [
//   // ... from the NASDAQ's opening day
//   {name: "ANGI", price: 31.22, timeStamp: new Date(2011,11,15) },
//   {name: "MSFT", price: 32.32, timeStamp: new Date(2011,11,15) },
//   {name: "GOOG", price: 150.43, timeStamp: new Date(2011,11,15)},
//   {name: "ANGI", price: 28.44, timeStamp: new Date(2011,11,16)},
//   {name: "GOOG", price: 199.33, timeStamp: new Date(2011,11,16)},
//   // ...and up to the present.
// ];
//
//
// function(pricesNASDAQ, printRecord) {
//   var microsoftPrices,
//     now = new Date(),
//     tenDaysAgo = new Date( now.getFullYear(), now.getMonth(), now.getDate() - 10);
//
//   // use filter() to filter the trades for MSFT prices recorded any time after 10 days ago
//   microsoftPrices =
//     pricesNASDAQ.
//     filter(function(priceRecord) {	 // finish this expression
//       return priceRecord.timeStamp  > tenDaysAgo
//     })
//
//   // Print the trades to the output console
//   microsoftPrices.
//   forEach(function(priceRecord) {
//     printRecord(priceRecord);
//   });
// }
//


// Notice that the console is changing over time. Now look at the time stamps on the stock prices. We're displaying stock prices sampled after we ran our program! How could our array have contained stock price records from the future? Did we accidentally rip a hole in the space-time continuum?
//
// The solution to the riddle is that pricesNASDAQ is not an array. Unlike an array, which can only store a snapshot of stock prices, this new type can react to changes and update over time.
//
//   In the next section I'll reveal the inner workings of this magical type. You'll learn how you can use it to model everything from mouse events to asynchronous JSON requests. Finally I'll show you how you can query this type using the 5 query functions you already know. It's about time we gave this magical type a name...
//
