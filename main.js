
'use strict';

const Enquirer = require('enquirer');

function compare(name) {
    return function sort(a, b) {
        return a[name] < b[name] ? 1 : -1;
    }   
}

let sellers = [ 'Ana', 'Paulo', 'Roger', 'Cristina', 'Roberto' ];

let vendas = [
    {SellerName: "Cristina", CustomerName: "Customer 1", DateOfSale: "date 1", SaleItemName: "Item name 1", SaleValue: "1"},
    {SellerName: "Roger", CustomerName: "Customer 2", DateOfSale: "date 2", SaleItemName: "Item name 2", SaleValue: "2"},
    {SellerName: "Ana", CustomerName: "Customer 3", DateOfSale: "date 3", SaleItemName: "Item name 3", SaleValue: "3"},
    {SellerName: "Paulo", CustomerName: "Customer 4", DateOfSale: "date 4", SaleItemName: "Item name 4", SaleValue: "4"},
    {SellerName: "Cristina", CustomerName: "Customer 5", DateOfSale: "date 5", SaleItemName: "Item name 5", SaleValue: "5"},
    {SellerName: "Paulo", CustomerName: "Customer 6", DateOfSale: "date 6", SaleItemName: "Item name 6", SaleValue: "6"},
    {SellerName: "Roberto", CustomerName: "Customer 7", DateOfSale: "date 7", SaleItemName: "Item name 7", SaleValue: "7"},
    {SellerName: "Cristina", CustomerName: "Customer 8", DateOfSale: "date 8", SaleItemName: "Item name 8", SaleValue: "8"}, 
    {SellerName: "Roger", CustomerName: "Customer 9", DateOfSale: "date 9", SaleItemName: "Item name 9", SaleValue: "9"}
];

let play = true;

const start = async function() {

    while (play){

        let result = await new Enquirer().prompt([
            {
                type: 'select',
                name: 'SellerName',
                message: 'Select a Seller',
                choices: sellers
            },
            {
                type: 'input',
                name: 'CustomerName',
                message: 'Inform the Customer Name'
            },
            {
                type: 'input',
                name: 'DateOfSale',
                message: 'Inform the date of sale'
            },
            {
                type: 'input',
                name: 'SaleItemName',
                message: 'Inform the sale item name'
            },
            {
                type: 'input',
                name: 'SaleValue',
                message: 'Inform the sale value'
            }
        
        ]);
    
        vendas.push(result)
    
        vendas = vendas.map ( (venda) => {
            venda.qtd = vendas.filter(function(e){ return e.SellerName === venda.SellerName; }).length;
            return venda;
        })
        
        vendas.sort(compare('SellerName'));
        vendas.sort(compare('qtd') );
    
        vendas.forEach ( (venda) => {
            console.log(
                `Seller name: ${venda.SellerName}, Customer name: ${venda.CustomerName}, Date of sale: ${venda.DateOfSale}, Sale item name: ${venda.SaleItemName}, Sale value: ${venda.SaleValue}.`
            );
        })
        

        result = await new Enquirer().prompt(
        {
            type: 'select',
            name: 'value',
            message: 'Continue?',
            choices: [ 'Yes', 'No' ]
        })

        play = result.value == 'No' ? false : true ;

    }
    
}

start();

