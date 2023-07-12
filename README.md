# Go-Insure

This is a decentralized insurance application built on **[Algorand](https://developer.algorand.org/)** blockchain technology using the **[Goracle](https://www.goracle.io/)** protocol. It aims to provide an alternative and transparent approach to traditional insurance by leveraging the benefits of decentralization and smart contracts.

## Problems with Traditional Insurance
 
Traditional insurance has several limitations and issues such as:

1. Lack of Transparency: Traditional insurance processes often lack transparency, making it challenging for policyholders to understand how premiums are calculated, claims are evaluated, and decisions are made.

2. Slow Claim Processing: Traditional insurance claims often involve manual processes, leading to delays, and disputes between the insurer and the insured.

3. Limited Access: Traditional insurance may exclude certain individuals or groups due to high premiums, bureaucracy, lack of coverage options for specific risks, or geographical restrictions.

4. Trust Dependency: Traditional insurance relies on centralized entities, such as insurance companies, to administer policies, process claims, and handle funds. This centralized model can lead to issues of trust, potential conflicts of interest, and single points of failure.

## Advantages of a Decentralized Solution

A decentralized insurance solution offers several benefits:

1. Transparency and Trustlessness: Decentralized insurance is built on blockchain technology, providing transparent and immutable records of policies, claims, and payouts. Smart contracts execute the predefined rules, ensuring transparency and reducing the need for trust in intermediaries.

2. Automated Claim Processing: Claims in decentralized insurance are processed automatically based on the predefined conditions in smart contracts. This eliminates bureaucracy, reduces processing times, and minimizes the potential for disputes.

3. Access for All: Decentralized insurance has the potential to provide coverage options for individuals or groups that are underserved by traditional insurance, offering more inclusive and affordable solutions.

4. Enhanced Security: Blockchain technology provides robust security measures, reducing the risks of fraud, data manipulation, and unauthorized access to sensitive information.

5. Elimination of Intermediaries: Decentralized insurance removes the need for traditional intermediaries, reducing costs, and increasing efficiency. This direct interaction between participants can result in lower premiums and faster payouts.


## Go-Insure Features

- Policy Creation: Users can create insurance policies.
- Policy Management: Users can view their active policies, track their coverage amounts, and monitor expiration dates.
- Claim Submission: Users can submit insurance claims when covered events occur, following predefined conditions.
- Claim Processing: Claims are automatically evaluated and processed based on the implemented smart contract logic.
- Payouts: Approved claims result in automatic payout transfers to the insured parties.


## Installation

1. Clone this repository: `git clone https://github.com/0xBitzz/Go-Insurance`

2. Install the necessary dependencies: `npm install`


## Usage

1. Start the application: `npm start`

2. Access the application in your web browser at `http://localhost:3000`.

## Dependencies

- python version 3.11.3
- beaker-pyteal version 1.0.1
- py-algorand-sdk version >=2.2.0, <3.0.0
- beaker-ts version ^0.0.95
- algosdk version 2.1.0
- next-js version 13.4.9
- txnlab/use-wallet version 2.0.0-alpha.5
