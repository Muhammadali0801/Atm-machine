#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 25000;
const myPin = 4321;
console.log(chalk.green('Welcome to the ATM service!'));
async function atmOperations() {
    let pinAsnwer = await inquirer.prompt({
        name: "pin",
        message: "Enter your pin",
        type: "number",
        validate: (input) => {
            if (!isNaN(input)) {
                return true;
            }
            return "Please enter a valid number";
        },
    });
    if (pinAsnwer.pin === myPin) {
        console.log(chalk.green("Your pin is correct"));
        let operationAns = await inquirer.prompt([
            {
                name: "operations",
                message: "Please select an option",
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
                    validate: (input) => {
                        if (!isNaN(input) && input > 0) {
                            return true;
                        }
                        return "Please enter a valid amount";
                    },
                },
            ]);
            if (amountAns.amount <= myBalance) {
                myBalance -= amountAns.amount;
                console.log(chalk.blue(`The remaining balance is ${myBalance}`));
            }
            else {
                console.log(chalk.red(`You have insufficient balance`));
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
            let selectedAmount = parseInt(fastcashAns.amount);
            if (selectedAmount <= myBalance) {
                myBalance -= selectedAmount;
                console.log(chalk.blue(`The remaining balance is ${myBalance}`));
            }
            else {
                console.log(chalk.red("You have insufficient balance"));
            }
        }
        else if (operationAns.operations === "Check balance") {
            console.log(chalk.blue(`Your current balance is ${myBalance}`));
        }
        let continueAns = await inquirer.prompt({
            name: "continue",
            message: "Do you want to perform another operation?",
            type: "confirm",
        });
        if (continueAns.continue) {
            await atmOperations(); // Recursively call atmOperations if user wants to continue
        }
        else {
            console.log(chalk.yellow("Thank you for using our service!"));
        }
    }
    else {
        console.log(chalk.red("Your pin is incorrect"));
    }
}
atmOperations(); // Initial call to start the ATM operations
