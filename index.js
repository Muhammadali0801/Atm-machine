#! /usr/bin/env node
import inquirer from "inquirer";
let myBalance = 25000;
const myPin = 4321;
let pinAsnwer = await inquirer.prompt({
    name: "pin",
    message: "Enter your pin",
    type: "number",
});
if (pinAsnwer.pin === myPin) {
    console.log("Your pin is correct");
    let operationAns = await inquirer.prompt([
        {
            name: "operations",
            message: "please select option",
            type: "list",
            choices: ["Withdraw", "Fast cash", "Check balance"],
        },
    ]);
    if (operationAns.operations === "Withdraw") {
        let amountAns = await inquirer.prompt([
            {
                name: "amount",
                message: "Enter your amount",
                type: "number",
            },
        ]);
        if (amountAns.amount <= myBalance) {
            let balance = myBalance - amountAns.amount;
            console.log(`The remaining balance is ${balance}`);
        }
        else {
            console.log(`You have insufficient balance`);
        }
    }
    else if (operationAns.operations === "Fast cash") {
        let fastcashAns = await inquirer.prompt([
            {
                name: "amount",
                type: "list",
                choices: ["1000", "5000", "10000", "15000", "20000"],
            },
        ]);
        if (fastcashAns.amount <= myBalance) {
            let balance2 = myBalance - fastcashAns.amount;
            console.log(`The remaining balance is ${balance2}`);
        }
        else {
            console.log("You have insufficient balance");
        }
    }
    else if (operationAns.operations === "Check balance") {
        console.log(myBalance);
    }
}
else {
    console.log("Your pin is incorrect");
}
