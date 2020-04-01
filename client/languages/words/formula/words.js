const vscode = require('vscode')

module.exports = [
	{
		label: 'if',
		insertText: 'if ()',
		kind: vscode.CompletionItemKind.Keyword
	},
	{
		label: 'else if',
		insertText: 'else if ()',
		kind: vscode.CompletionItemKind.Keyword
	},
	{
		label: 'else',
		insertText: 'else',
		kind: vscode.CompletionItemKind.Keyword
	},
	{
		label: 'return',
		insertText: 'return',
		kind: vscode.CompletionItemKind.Keyword
	},
	{
		label: 'true',
		insertText: 'true',
		kind: vscode.CompletionItemKind.Keyword
	},
	{
		label: 'false',
		insertText: 'false',
		kind: vscode.CompletionItemKind.Keyword
	},
	{
		label: 'var',
		insertText: 'var',
		kind: vscode.CompletionItemKind.Keyword,
		detail: '`var` state variable',
		documentation: {
			value:
`
State variables are persisted across invocations of autonomous agents.

Accessing state variables:

	\`{
	var['var_name1']
	var['JVUJQ7OPBJ7ZLZ57TTNFJIC3EW7AE2RY']['var_name1']
	}\`

Assigning state variables:

	\`{
	var['var_name1'] = 'var_value';
	var['var_name2'] = 10;
	var['var_name3'] += 10;
	var['var_name4'] = false;
	}\`

\`var['var_name']\` reads the value of state variable \`var_name\` stored under current AA.

\`var['AA_ADDRESS']['var_name']\` reads the value of state variable \`var_name\` stored under AA \`AA_ADDRESS\`.  \`AA_ADDRESS\` is a valid address or \`this_address\` to refer to the current AA.

If there is no such variable, \`false\` is returned.

State variables can be accessed in any oscript but can be assigned only in state script.  Only state vars of the current AA can be assigned, state vars of other AAs are read-only.  State vars can be reassigned multiple times but only the final value will be saved to the database and only if the AA finishes successfully.  All changes are committed atomically.  If the AA fails, all changes to state vars are rolled back.

State vars can temporarily hold strings, numbers, and booleans but when persisting, \`true\` values are converted to 1 and \`false\` values result in removal of the state variable from storage.

If the right-hand side of the assignment is an object, \`true\` is assigned.  State vars cannot hold objects.

In addition to regular assignment \`=\`, state variables can also be modified in place using the following operators:
* \`+=\`: increment by;
* \`-=\`: decrement by;
* \`*=\`: multiply by;
* \`/=\`: divide by;
* \`%=\`: remainder of division by;
* \`||=\`: concatenate to the end of string.

For concatenation, the existing value of the var is converted to string.

For \`+=\`, \`-=\`, \`*=\`, \`/=\`, \`%=\`, the existing boolean value is converted to 1 or 0, strings result in error.

If the variable didn't exist prior to one of these assignments, it is taken as \`false\` and converted to number or string accordingly.

Each read or write operation on a state variable adds +1 to complexity.  Assignment with modification also costs 1 in complexity.

Examples:

	\`{
	var['sent_back'] = $half_amount;
	var['count_investors'] += 1;
	var['amount_owed'] += trigger.output[[asset=base]];
	var['pending'] = false;
	$x = var['JVUJQ7OPBJ7ZLZ57TTNFJIC3EW7AE2RY']['var_name1'];
	}\`
`
		}
	},
	{
		quoted: false,
		label: 'trigger.output',
		insertText: 'trigger.output[[]]',
		kind: vscode.CompletionItemKind.Keyword,
		detail: '`trigger.output` external reference',
		documentation: {
			value:
`
	\`{
	trigger.output[[asset=assetID]].field
	trigger.output[[asset!=assetID]].field
	}\`

Output sent to the AA address in the specified asset.

\`assetID\` can be \`base\` for bytes or any expression that evaluates to asset ID.

\`field\` can be \`amount\` or \`asset\` or omitted.  If omitted, \`amount\` is assumed.  If the trigger unit had several outputs in the same asset to this AA address, their amounts are summed.

The search criteria can be \`=\` (\`asset=assetID\`) or \`!=\` (\`asset!=assetID\`).

Examples:

	\`{
	trigger.output[[asset=base]]
	trigger.output[[asset=base]].amount
	trigger.output[[asset="j52n7Bfec9jW"]]
	trigger.output[[asset=$asset]]
	trigger.output[[asset!=base]]
	trigger.output[[asset!=base]].amount
	if (trigger.output[[asset!=base]].asset == 'ambiguous'){
		...
	}
	}\`

If there is no output that satisfies the search criteria, the returned \`.amount\` is 0 and the returned \`.asset\` is a string \`none\`.  Your code should check for this string if necessary.

If there is more than one output that satisfies the search criteria (which is possible only for \`!=\`), the returned \`.asset\` is a string \`ambiguous\`.  Your code should check for this string if necessary.  Trying to access \`.amount\` of an ambiguous asset fails the script.
`
		}
	},
	{
		quoted: false,
		label: 'trigger.data',
		insertText: 'trigger.data',
		kind: vscode.CompletionItemKind.Keyword,
		detail: '`trigger.data` external reference',
		documentation: {
			value:
`
Data sent with the trigger unit in its \`data\` message.  \`trigger.data\` returns the entire data object, \`trigger.data.field1.field2\` or \`trigger.data.field1[expr2]\` tries to access a deeper nested field:
* if it is an object, object is returned;
* if it is a scalar (string, number, or boolean), scalar is returned;
* if it doesn't exist, \`false\` is returned.

For example, if the trigger unit had this data message

	{
		"app": "data",
		"payload": {
			"field1": {
				"field2": "value2",
				"abc": 88
			},
			"abc": "def"
		},
		"payload_hash": "..."
	}

\`trigger.data\` would be equal to

	{
		"field1": {
			"field2": "value2",
			"abc": 88
		},
		"abc": "def"
	}

\`trigger.data.field1\` would be equal to

	{
		"field2": "value2",
		"abc": 88
	}

\`trigger.data.field1.field2\` would be equal to string \`value2\`,

\`trigger.data.field1['a' || 'bc']\` would be equal to number \`88\`,

\`trigger.data.field1.nonexistent\` would be equal to boolean \`false\`,

\`trigger.data.nonexistent.anotherfield\` would be equal to boolean \`false\`.
`
		}
	},
	{
		quoted: false,
		label: 'trigger.unit',
		insertText: 'trigger.unit',
		kind: vscode.CompletionItemKind.Keyword,
		detail: '`trigger.unit` external reference',
		documentation: {
			value:
`
The unit that sent money to this AA.
`
		}
	},
	{
		quoted: false,
		label: 'trigger.address',
		insertText: 'trigger.address',
		kind: vscode.CompletionItemKind.Keyword,
		detail: '`trigger.address` external reference',
		documentation: {
			value:
`
The address of the sender who sent money to this AA.  If the sending unit was signed by several addresses, the first one is used.
`
		}
	},
	{
		quoted: false,
		label: 'trigger.initial_address',
		insertText: 'trigger.initial_address',
		kind: vscode.CompletionItemKind.Keyword,
		detail: '`trigger.initial_address` external reference',
		documentation: {
			value:
`
The address of the sender who sent money to the initial AA of a chain of AAs. Same as \`trigger.address\` if there was no chain.  When an AA sends money to another AA, \`trigger.initial_address\` remains unchanged.
`
		}
	},
	{
		quoted: false,
		label: 'mci',
		insertText: 'mci',
		kind: vscode.CompletionItemKind.Keyword,
		detail: '`mci` external reference',
		documentation: {
			value:
`
MCI of the trigger unit, which is the same as MCI of MC unit the response unit (if any) will be attached to.
`
		}
	},
	{
		quoted: false,
		label: 'timestamp',
		insertText: 'timestamp',
		kind: vscode.CompletionItemKind.Keyword,
		detail: '`timestamp` external reference',
		documentation: {
			value:
`
Timestamp of the MC unit that recently became stable, this is the unit whose stabilization triggered the execution of this AA.  This is the same unit the response unit (if any) will be attached to.
`
		}
	},
	{
		quoted: false,
		label: 'this_address',
		insertText: 'this_address',
		kind: vscode.CompletionItemKind.Keyword,
		detail: '`this_address` external reference',
		documentation: {
			value:
`
\`this_address\`, \`this address\`
The address of this AA.
`
		}
	},
	{
		quoted: false,
		label: 'response_unit',
		insertText: 'response_unit',
		kind: vscode.CompletionItemKind.Keyword,
		detail: '`response_unit` external reference',
		documentation: {
			value:
`
The hash of the unit that will be generated by the AA in response to the trigger.  This variable is available only in state script.  Any references to this variable in any other scripts will fire an error.
`
		}
	},
	{
		quoted: false,
		label: 'mc_unit',
		insertText: 'mc_unit',
		kind: vscode.CompletionItemKind.Keyword,
		detail: '`mc_unit` external reference',
		documentation: {
			value:
`
The hash of the MC unit that includes (or is equal to) the trigger unit.
`
		}
	},
	{
		quoted: false,
		label: 'asset[',
		insertText: 'asset[]',
		kind: vscode.CompletionItemKind.Keyword,
		detail: '`asset` external reference',
		documentation: {
			value:
`
	\`{
	asset[expr].field
	asset[expr][field_expr]
	}\`

Extracts information about an asset. This adds +1 to complexity. \`expr\` is \`base\` for bytes or an expression that evaluates to an asset ID.

\`field\` is on of the following, \`field_expr\` should evaluate to one of the following:
* \`exists\`: boolean, returns \`false\` if asset ID is invalid;
* \`cap\`: number, total supply of the asset.  For uncapped assets, 0 is returned;
* \`is_private\`: boolean, is the asset private?
* \`is_transferrable\`: boolean, is the asset transferrable?
* \`auto_destroy\`: boolean, does the asset gets autodestroyed when sent to definer address?
* \`fixed_denominations\`: boolean, is the asset issued in fixed denominations? Currently AAs can't send fixed denomination assets, but if \`issued_by_definer_only\` is \`false\` then somebody else can issue them.
* \`issued_by_definer_only\`: boolean, is the asset issued by definer only?
* \`cosigned_by_definer\`: boolean, should each transfer be cosigned by definer?
* \`spender_attested\`: boolean, should each holder be attested?
* \`is_issued\`: boolean, is any amount of the asset already issued?
* \`definer_address\`: string, returns wallet address of the definer.

Examples:

	\`{
	asset[base].cap
	asset['base"].cap
	asset['abc"].exists
	asset['n9y3VomFeWFeZZ2PcSEcmyBb/bI7kzZduBJigNetnkY='].is_issued
	asset['n9y3VomFeWFeZZ2PcSEcmyBb/bI7kzZduBJigNetnkY=']['is_' || 'issued']
	asset['n9y3VomFeWFeZZ2PcSEcmyBb/bI7kzZduBJigNetnkY=']['is_' || 'private']
	}\`

If the asset ID is valid, but does not exist then \`false\` is returned for any field.
`
		}
	},
	{
		quoted: false,
		label: 'data_feed',
		insertText: 'data_feed[[]]',
		kind: vscode.CompletionItemKind.Keyword,
		detail: '`data_feed` external reference',
		documentation: {
			value:
`
	\`{
	data_feed[[oracles=listOfOracles, feed_name=nameOfDataFeed, ...]]
	}\`

Finds data feed value by search criteria.  This adds +1 to complexity.

There are multiple search criteria listed between the double brackets, their order is insignificant.
* \`oracles\`: string, list of oracle addresses delimited by \`:\` (usually only one oracle). \`this_address\` refers to the current AA;
* \`feed_name\`: string, the name of the data feed;
* \`feed_value\`: string or number, optional, search only for this specific value of the data feed;
* \`min_mci\`: number, optional, search only since the specified MCI;
* \`ifseveral\`: string, optional, \`last\` or \`abort\`, what to do if several values found that match all the search criteria, return the last one or abort the script with error, default is \`last\`
* \`ifnone\`: string or number or boolean, optional, the value to return if nothing is found.  By default, this results in an error and aborts the script;
* \`what\`: string, optional, \`value\` or \`unit\`, what to return, the data feed value or the unit where it was posted, default is \`value\`;
* \`type\`: string, optional, \`auto\` or \`string\`, what type to return, default is \`auto\`.  For \`auto\`, data feed values that look like valid IEEE754 numbers are returned as numbers, otherwise they are returned as strings.  If \`string\`, the returned value is always a string.  This setting affects only the values extracted from the database; if \`ifnone\` is used, the original type of \`ifnone\` value is always preserved.

Data feeds are searched before the MCI of the triggering unit (inclusively).  If there are several AAs stemming from the same MCI, previous AA responses are also searched.

Examples:

	\`{
	data_feed[[oracles='JPQKPRI5FMTQRJF4ZZMYZYDQVRD55OTC', feed_name='BTC_USD']]
	data_feed[[oracles=this_address, feed_name='score']]
	data_feed[[oracles='JPQKPRI5FMTQRJF4ZZMYZYDQVRD55OTC:I2ADHGP4HL6J37NQAD73J7E5SKFIXJOT', feed_name='timestamp']]
	}\`
`
		}
	},
	{
		quoted: false,
		label: 'in_data_feed',
		insertText: 'in_data_feed[[]]',
		kind: vscode.CompletionItemKind.Keyword,
		detail: '`in_data_feed` external reference',
		documentation: {
			value:
`
	\`{
	in_data_feed[[oracles=listOfOracles, feed_name=nameOfDataFeed, feed_value>feedValue, ...]]
	}\`

Determines if a data feed can be found by search criteria.  Returns \`true\` or \`false\`.  This adds +1 to complexity.

There are multiple search criteria listed between the double brackets, their order is insignificant.
* \`oracles\`: string, list of oracle addresses delimited by \`:\` (usually only one oracle). \`this_address\` refers to the current AA;
* \`feed_name\`: string, the name of the data feed;
* \`feed_value\`: string or number, search only for values of the data feed that are \`=\`, \`!=\`, \`>\`, \`>=\`, \`<\`, or \`<=\` than the specified value;
* \`min_mci\`: number, optional, search only since the specified MCI.

Data feeds are searched before the MCI of the triggering unit (inclusively).  If there are several AAs stemming from the same MCI, previous AA responses are also searched.

Examples:

	\`{
	in_data_feed[[oracles='JPQKPRI5FMTQRJF4ZZMYZYDQVRD55OTC', feed_name='BTC_USD', feed_value>12345.67]]
	in_data_feed[[oracles=this_address, feed_name='score', feed_value=$score]]
	in_data_feed[[oracles='JPQKPRI5FMTQRJF4ZZMYZYDQVRD55OTC:I2ADHGP4HL6J37NQAD73J7E5SKFIXJOT', feed_name='timestamp', feed_value>=1.5e9]]
	}\`
`
		}
	},
	{
		quoted: false,
		label: 'attestation',
		insertText: 'attestation[[]]',
		kind: vscode.CompletionItemKind.Keyword,
		detail: '`attestation` external reference',
		documentation: {
			value:
`
	\`{
	attestation[[attestors=listOfAttestors, address=attestedAddress, ...]].field
	attestation[[attestors=listOfAttestors, address=attestedAddress, ...]][field_expr]
	}\`

Finds an attestation by search criteria.  This adds +1 to complexity.

There are multiple search criteria listed between the double brackets, their order is insignificant.
* \`attestors\`: string, list of attestor addresses delimited by \`:\` (usually only one attestor). \`this_address\` is also a valid attestor address and it refers to the current AA;
* \`address\`: string, the address that was attested;
* \`ifseveral\`: string, optional, \`last\` or \`abort\`, what to do if several matching attestations are found, return the last one or abort the script with error, default is \`last\`
* \`ifnone\`: string or number or boolean, optional, the value to return if nothing is found.  By default, this results in an error and aborts the script;
* \`type\`: string, optional, \`auto\` or \`string\`, what type to return, default is \`auto\`.  For \`auto\`, attested field values that look like valid IEEE754 numbers are returned as numbers, otherwise they are returned as strings.  If \`string\`, the returned value is always a string.  This setting affects only the values extracted from the database; if \`ifnone\` is used, the original type of \`ifnone\` value is always preserved.

\`field\` string or \`field_expr\` expression are optional and they indicate the attested field whose value should be returned.  Without \`field\` or \`field_expr\`, \`true\` is returned if an attestation is found.

If no matching attestation is found, \`ifnone\` value is returned (independently of \`field\`).  If there is no \`ifnone\`, \`false\` is returned.

If a matching attestation exists but the requested field does not, the result is as if the attestation did not exist.

Attestations are searched before the MCI of the triggering unit (inclusively).  If there are several AAs stemming from the same MCI, previous AA responses are also searched.

Examples:

	\`{
	attestation[[attestors='UOYYSPEE7UUW3KJAB5F4Y4AWMYMDDB4Y', address='BI2MNEVU4EFWL4WSBILFK7GGMVNS2Q3Q']].email
	attestation[[attestors=this_address, address=trigger.address]]
	attestation[[attestors='JEDZYC2HMGDBIDQKG3XSTXUSHMCBK725', address='TSXOWBIK2HEBVWYTFE6AH3UEAVUR2FIF', ifnone='anonymous']].steem_username
	attestation[[attestors='JEDZYC2HMGDBIDQKG3XSTXUSHMCBK725', address='TSXOWBIK2HEBVWYTFE6AH3UEAVUR2FIF']].reputation
	}\`
`
		}
	},
	{
		quoted: false,
		label: 'input',
		insertText: 'input[[]]',
		kind: vscode.CompletionItemKind.Keyword,
		detail: '`input` external reference',
		documentation: {
			value:
`
	\`{
	input[[asset=assetID, amount=amountValue, address=inputAddress]].field
	}\`

Tries to find an input in the current unit by search criteria.

These language constructs are available only in non-AA formulas in smart contracts (\`["formula", ...]\` clause).

There are multiple search criteria listed between the double brackets, their order is insignificant.  All search criteria are optional but at least one must be present.
* \`asset\`: string, asset of input, can be \`base\` for bytes.  Comparison operators can be only \`=\` or \`!=\`;
* \`address\`: string, the address receives spends an input, can be \`this_address\`.  Comparison operators can be only \`=\` or \`!=\` (other addresses);
* \`amount\`: number, the condition for the amount of an input.  Allowed comparison operators are: \`=\`, \`!=\`, \`>\`, \`>=\`, \`<\`, \`<=\`.

\`field\` is one of \`amount\`, \`address\`, and \`asset\`.  It indicates which information about the input we are interested in.

If no input is found by search criteria or there is more than one matching entry, the formula fails.

Examples:

	\`{
	input[[asset=base]].amount
	}\`
`
		}
	},
	{
		quoted: false,
		label: 'output',
		insertText: 'output[[]]',
		kind: vscode.CompletionItemKind.Keyword,
		detail: '`output` external reference',
		documentation: {
			value:
`
	\`{
	output[[asset=assetID, amount>minAmount, address=outputAddress]].field
	}\`

Tries to find an output in the current unit by search criteria.

These language constructs are available only in non-AA formulas in smart contracts (\`["formula", ...]\` clause).

There are multiple search criteria listed between the double brackets, their order is insignificant.  All search criteria are optional but at least one must be present.
* \`asset\`: string, asset of output, can be \`base\` for bytes.  Comparison operators can be only \`=\` or \`!=\`;
* \`address\`: string, the address receives an output, can be \`this_address\`.  Comparison operators can be only \`=\` or \`!=\` (other addresses);
* \`amount\`: number, the condition for the amount of an output.  Allowed comparison operators are: \`=\`, \`!=\`, \`>\`, \`>=\`, \`<\`, \`<=\`.

\`field\` is one of \`amount\`, \`address\`, and \`asset\`.  It indicates which information about the output we are interested in.

If no output is found by search criteria or there is more than one matching entry, the formula fails.

Examples:

	\`{
	output[[asset = base, address=GFK3RDAPQLLNCMQEVGGD2KCPZTLSG3HN]].amount
	output[[asset = base, address="GFK3RDAPQLLNCMQEVGGD2KCPZTLSG3HN"]].amount
	output[[asset = "n9y3VomFeWFeZZ2PcSEcmyBb/bI7kzZduBJigNetnkY=", amount>=100]].address
	}\`
`
		}
	},
	{
		label: 'typeof',
		insertText: 'typeof',
		kind: vscode.CompletionItemKind.Function,
		detail: '`typeof` built-in',
		documentation: {
			value:
`
	\`{
	typeof(anything)
	}\`

Returns \`"string"\`, \`"number"\`, \`"boolean"\` or \`"object"\`.
`
		}
	},
	{
		label: 'sqrt',
		insertText: 'sqrt',
		kind: vscode.CompletionItemKind.Function,
		detail: '`sqrt` built-in',
		documentation: {
			value:
`
	\`{
	sqrt(number)
	}\`

This function adds +1 to complexity count.

Negative numbers cause an error.  Non-number inputs are converted to numbers or result in error.
`
		}
	},
	{
		label: 'ln',
		insertText: 'ln',
		kind: vscode.CompletionItemKind.Function,
		detail: '`ln` built-in',
		documentation: {
			value:
`
	\`{
	ln(number)
	}\`

This function adds +1 to complexity count.

Negative numbers cause an error. Non-number inputs are converted to numbers or result in error.
`
		}
	},
	{
		label: 'abs',
		insertText: 'abs',
		kind: vscode.CompletionItemKind.Function,
		detail: '`abs` built-in',
		documentation: {
			value:
`
	\`{
	abs(number)
	}\`

Returns absolute value of a number. Non-number inputs are converted to numbers or result in error.
`
		}
	},
	{
		label: 'round',
		insertText: 'round',
		kind: vscode.CompletionItemKind.Function,
		detail: '`round` built-in',
		documentation: {
			value:
`
	\`{
	round(number [, decimal_places])
	}\`

Rounds the input number to the specified number of decimal places (0 if omitted). \`round\` uses \`ROUND_HALF_EVEN\` rules.  Non-number inputs are converted to numbers or result in error. Negative or non-integer \`decimal_places\` results in error. \`decimal_places\` greater than 15 results in error.
`
		}
	},
	{
		label: 'ceil',
		insertText: 'ceil',
		kind: vscode.CompletionItemKind.Function,
		detail: '`ceil` built-in',
		documentation: {
			value:
`
	\`{
	ceil(number [, decimal_places])
	}\`

Rounds the input number to the specified number of decimal places (0 if omitted). \`round\` uses \`ROUND_HALF_EVEN\` rules.  Non-number inputs are converted to numbers or result in error. Negative or non-integer \`decimal_places\` results in error. \`decimal_places\` greater than 15 results in error.
`
		}
	},
	{
		label: 'floor',
		insertText: 'floor',
		kind: vscode.CompletionItemKind.Function,
		detail: '`floor` built-in',
		documentation: {
			value:
`
	\`{
	floor(number [, decimal_places])
	}\`

Rounds the input number to the specified number of decimal places (0 if omitted). \`round\` uses \`ROUND_HALF_EVEN\` rules.  Non-number inputs are converted to numbers or result in error. Negative or non-integer \`decimal_places\` results in error. \`decimal_places\` greater than 15 results in error.
`
		}
	},
	{
		label: 'min',
		insertText: 'min',
		kind: vscode.CompletionItemKind.Function,
		detail: '`min` built-in',
		documentation: {
			value:
`
	\`{
	min(number1, [number2[, number3[, ...]]])
	}\`

Returns minimum among the set of numbers.  Non-number inputs are converted to numbers or result in error.
`
		}
	},
	{
		label: 'max',
		insertText: 'max',
		kind: vscode.CompletionItemKind.Function,
		detail: '`max` built-in',
		documentation: {
			value:
`
	\`{
	max(number1, [number2[, number3[, ...]]])
	}\`

Returns maximum among the set of numbers.  Non-number inputs are converted to numbers or result in error.
`
		}
	},
	{
		label: 'hypot',
		insertText: 'hypot',
		kind: vscode.CompletionItemKind.Function,
		detail: '`hypot` built-in',
		documentation: {
			value:
`
	\`{
	hypot(number1, [number2[, number3[, ...]]])
	}\`

Returns the square root of the sum of squares of all arguments.  Boolean parameters are converted to 1 and 0, objects are taken as 1, all other types result in error.  The function returns a non-infinity result even if some intermediary results (squares) would overflow.

This function adds +1 to complexity count.
`
		}
	},
	{
		label: 'substring',
		insertText: 'substring',
		kind: vscode.CompletionItemKind.Function,
		detail: '`substring` built-in',
		documentation: {
			value:
`
	\`{
	substring(string, start_index)
	substring(string, start_index, length)
	}\`

Returns part of the string. If \`length\` is not set then returns rest of the string from \`start_index\`.
If \`start_index\` is negative then \`substring\` uses it as a character index from the end of the string.
If \`start_index\` is negative and absolute of \`start_index\` is larger than the length of the string then \`substring\` uses 0 as the \`start_index\`.
`
		}
	},
	{
		label: 'index_of',
		insertText: 'index_of',
		kind: vscode.CompletionItemKind.Function,
		detail: '`index_of` built-in',
		documentation: {
			value:
`
	\`{
	index_of(string, search_string)
	}\`

Returns integer index (starting from 0) of searched string position in string. If searched string is not found then -1 is returned. Use \`contains\` if you don't need to know the index of the searched string.
`
		}
	},
	{
		label: 'starts_with',
		insertText: 'starts_with',
		kind: vscode.CompletionItemKind.Function,
		detail: '`starts_with` built-in',
		documentation: {
			value:
`
	\`{
	starts_with(string, prefix)
	}\`

Returns boolean when the string starts with specified string.
`
		}
	},
	{
		label: 'ends_with',
		insertText: 'ends_with',
		kind: vscode.CompletionItemKind.Function,
		detail: '`ends_with` built-in',
		documentation: {
			value:
`
	\`{
	ends_with(string, suffix)
	}\`

Returns boolean when the string ends with specified string.
`
		}
	},
	{
		label: 'contains',
		insertText: 'contains',
		kind: vscode.CompletionItemKind.Function,
		detail: '`contains` built-in',
		documentation: {
			value:
`
	\`{
	contains(string, search_string)
	}\`

Returns boolean \`true\` if the string contains searched string.
`
		}
	},
	{
		label: 'length',
		insertText: 'length',
		kind: vscode.CompletionItemKind.Function,
		detail: '`length` built-in',
		documentation: {
			value:
`
	\`{
	length(string)
	}\`

Returns the number of characters in string.
`
		}
	},
	{
		label: 'parse_date',
		insertText: 'parse_date',
		kind: vscode.CompletionItemKind.Function,
		detail: '`parse_date` built-in',
		documentation: {
			value:
`
	\`{
	parse_date(ISO8601_date)
	parse_date(ISO8601_datetime)
	}\`

Attempts to parse string of date or date + time and returns timestamp. If you need to get seconds from UNIX Epoch of a current unit then use \`timestamp\`.
`
		}
	},
	{
		label: 'timestamp_to_string',
		insertText: 'timestamp_to_string',
		kind: vscode.CompletionItemKind.Function,
		detail: '`timestamp_to_string` built-in',
		documentation: {
			value:
`
	\`{
	timestamp_to_string(timestamp)
	timestamp_to_string(timestamp, 'datetime')
	timestamp_to_string(timestamp, 'date')
	timestamp_to_string(timestamp, 'time')
	}\`

	Returns string format of date + time (default, date or time from \`timestamp\`. Timezone is UTC.
`
		}
	},
	{
		label: 'json_parse',
		insertText: 'json_parse',
		kind: vscode.CompletionItemKind.Function,
		detail: '`json_parse` built-in',
		documentation: {
			value:
`
	\`{
	json_parse(string)
	}\`

Attempts to parse the input JSON string. If the result of parsing is an object, the object is returned.  If the result is a scalar (boolean, string, number), the scalar is returned.

This function adds +1 to complexity count.

If parsing fails, \`false\` is returned.

Non-string input is converted to string.
`
		}
	},
	{
		label: 'json_stringify',
		insertText: 'json_stringify',
		kind: vscode.CompletionItemKind.Function,
		detail: '`json_stringify` built-in',
		documentation: {
			value:
`
	\`{
	json_stringify(string)
	}\`

Stringifies the input parameter into JSON.  The parameter can also be a number, boolean, or string.  If it is a number outside the IEEE754 range, the formula fails.  Objects in the returned JSON are sorted by keys.
`
		}
	},
	{
		label: 'array_length',
		insertText: 'array_length',
		kind: vscode.CompletionItemKind.Function,
		detail: '`array_length` built-in',
		documentation: {
			value:
`
	\`{
	array_length(object)
	}\`

Returns number of elements if the object is an array. Use \`is_array\` to determine if object is an array.
`
		}
	},
	{
		label: 'number_from_seed',
		insertText: 'number_from_seed',
		kind: vscode.CompletionItemKind.Function,
		detail: '`number_from_seed` built-in',
		documentation: {
			value:
`
	\`{
	number_from_seed(string)
	number_from_seed(string, max)
	number_from_seed(string, min, max)
	}\`

Generates a number from a seed string. The same seed always produces the same number. The numbers generated from different seed strings are uniformly distributed in the specified interval.

The first form returns a fractional number from 0 to 1.

The second form returns an integer number from 0 to max inclusive.

The third form returns an integer number from min to max inclusive.

This function is useful for generating pseudo-random numbers from a seed string.  It adds +1 to complexity count.
`
		}
	},
	{
		label: 'sha256',
		insertText: 'sha256',
		kind: vscode.CompletionItemKind.Function,
		detail: '`sha256` built-in',
		documentation: {
			value:
`
	\`{
	sha256(string)
	}\`

Returns SHA-256 hash of input string in Base64 encoding. Non-string inputs are converted to strings. This function adds +1 to complexity count.
`
		}
	},
	{
		label: 'is_integer',
		insertText: 'is_integer',
		kind: vscode.CompletionItemKind.Function,
		detail: '`is_integer` built-in',
		documentation: {
			value:
`
	\`{
	is_integer(number)
	}\`

Returns boolean \`true\` if the number is without fractionals.
`
		}
	},
	{
		label: 'is_array',
		insertText: 'is_array',
		kind: vscode.CompletionItemKind.Function,
		detail: '`is_array` built-in',
		documentation: {
			value:
`
	\`{
	is_array(object)
	}\`

Returns boolean \`true\` if the object is an array.
`
		}
	},
	{
		label: 'is_assoc',
		insertText: 'is_assoc',
		kind: vscode.CompletionItemKind.Function,
		detail: '`is_assoc` built-in',
		documentation: {
			value:
`
	\`{
	is_assoc(object)
	}\`

Returns boolean \`true\` if the object is an associative array (dictionary).
`
		}
	},
	{
		label: 'is_valid_address',
		insertText: 'is_valid_address',
		kind: vscode.CompletionItemKind.Function,
		detail: '`is_valid_address` built-in',
		documentation: {
			value:
`
	\`{
	is_valid_address(string)
	}\`

Returns boolean \`true\` if the string is valid Obyte wallet address.
`
		}
	},
	{
		label: 'is_aa',
		insertText: 'is_aa',
		kind: vscode.CompletionItemKind.Function,
		detail: '`is_aa` built-in',
		documentation: {
			value:
`
	\`{
	is_aa(string)
	}\`

Returns boolean \`true\` if the string is Autonomous Agent address.
`
		}
	},
	{
		label: 'is_valid_amount',
		insertText: 'is_valid_amount',
		kind: vscode.CompletionItemKind.Function,
		detail: '`is_valid_amount` built-in',
		documentation: {
			value:
`
	\`{
	is_valid_amount(number)
	}\`

Returns boolean \`true\` if number is positive, integer, and below MAX_CAP (maximum cap that any token can have on Obyte platform).
`
		}
	},
	{
		label: 'is_valid_signed_package',
		insertText: 'is_valid_signed_package',
		kind: vscode.CompletionItemKind.Function,
		detail: '`is_valid_signed_package` built-in',
		documentation: {
			value:
`
	\`{
		is_valid_signed_package(signedPackage, address)
	}\`

Returns \`true\` if \`signedPackage\` object is a valid signed package signed by address \`address\`, returns \`false\` otherwise (the formula doesn't fail even if \`signedPackage\` doesn't have the correct format). \`address\` must be a valid address, otherwise the expression fails with an error. This function adds +1 to complexity count.

\`signedPackage\` object is usually passed through the trigger and has the following structure:

	\`{
		{
			"signed_message": {
				"field1": "value1",
				"field2": "value2",
				...
			},
			"authors": [
				{
					"address": "2QHG44PZLJWD2H7C5ZIWH4NZZVB6QCC7",
					"authentifiers": {
						"r": "MFZ0eFJeLAgAmm6BJdvbEzNt7x0H2Fb5RQBBpMSmyVFMLM2r2SX5chU9hbEWXExkz/T2hXAk1qHmxkAbbpZw8w=="
					}
				}
			],
			"last_ball_unit": "izgjyn9bpbJjwpKQV7my0Dq1VUHbzrLpWLrdR0fDydw=",
			"version": "2.0"
		}
	}\`

Here:
* \`signed_message\` is the message being signed, it can be an object, an array, or scalar;
* \`authors\` is an array of authors who signed the message (usually one), it has the same structure as unit authors and includes the signing address, authentifiers (usually signatures) and optionally definitions;
* \`last_ball_unit\`: optional unit of last ball that indicates the position on the DAG at which the message was signed. If definition is not included in \`author\`, it must be known at this point in the ledger history. If there is no \`last_ball_unit\` in \`signedPackage\`, including address definition as part of each \`author\` is required;
* \`version\`: always \`2.0\`.

Usually, \`signedPackage\` is created by calling \`signMessage\` function from \`signed_message\` module:

	\`{
		var headlessWallet = require('headless-obyte');
		var signed_message = require('ocore/signed_message.js');

		signed_message.signMessage(message, address, headlessWallet.signer, true, function (err, signedPackage) {
			// handle result here
			trigger.data.signedPackage = signedPackage;
		});
	}\`

The function creates a correctly structured \`signedPackage\` object which can be added to \`trigger.data\`.
`
		}
	},
	{
		label: 'bounce',
		insertText: 'bounce',
		kind: vscode.CompletionItemKind.Function,
		detail: '`bounce` built-in',
		documentation: {
			value:
`
	\`{
	bounce(string)
	}\`

Aborts the script's execution with error message passed as the function's argument. The received money will be bounced to sender (less bounce fees).
`
		}
	},
	{
		label: 'asset=',
		labelAlts: ['asset!'],
		insertText: 'asset=',
		kind: vscode.CompletionItemKind.Module,
		detail: '`asset` search condition',
		documentation: {
			value:
`
\`asset\`: string, asset of input or output, can be \`base\` for bytes. Comparison operators can be only \`=\` or \`!=\`;
`
		}
	},
	{
		label: 'address=',
		labelAlts: ['address!'],
		insertText: 'address=',
		kind: vscode.CompletionItemKind.Module,
		detail: '`address` search condition',
		documentation: {
			value:
`
\`address\`: string, the address that was attested;
`
		}
	},
	{
		label: 'amount=',
		labelAlts: ['amount!', 'amount>', 'amount<'],
		insertText: 'amount=',
		kind: vscode.CompletionItemKind.Module,
		detail: '`amount` search condition',
		documentation: {
			value:
`
\`amount\`: number, the condition for the amount of an input or output. Allowed comparison operators are: \`=\`, \`!=\`, \`>\`, \`>=\`, \`<\`, \`<=\`.
`
		}
	},
	{
		label: 'oracles=',
		insertText: 'oracles=',
		kind: vscode.CompletionItemKind.Module,
		detail: '`oracles` search condition',
		documentation: {
			value:
`
\`oracles\`: string, list of oracle addresses delimited by \`:\` (usually only one oracle). \`this_address\` refers to the current AA;
`
		}
	},
	{
		label: 'feed_name=',
		insertText: 'feed_name=',
		kind: vscode.CompletionItemKind.Module,
		detail: '`feed_name` search condition',
		documentation: {
			value:
`
\`feed_name\`: string, the name of the data feed;
`
		}
	},
	{
		label: 'feed_value=',
		labelAlts: ['feed_value!', 'feed_value>', 'feed_value<'],
		insertText: 'feed_value=',
		kind: vscode.CompletionItemKind.Module,
		detail: '`feed_value` search condition',
		documentation: {
			value:
`
\`feed_value\`: string or number, optional, search only for this specific value of the data feed;
`
		}
	},
	{
		label: 'min_mci=',
		insertText: 'min_mci=',
		kind: vscode.CompletionItemKind.Module,
		detail: '`min_mci` search condition',
		documentation: {
			value:
`
\`min_mci\`: number, optional, search only since the specified MCI;
`
		}
	},
	{
		label: 'ifseveral=',
		insertText: 'ifseveral=',
		kind: vscode.CompletionItemKind.Module,
		detail: '`ifseveral` search condition',
		documentation: {
			value:
`
\`ifseveral\`: string, optional, \`last\` or \`abort\`, what to do if several values found that match all the search criteria, return the last one or abort
`
		}
	},
	{
		label: 'ifnone=',
		insertText: 'ifnone=',
		kind: vscode.CompletionItemKind.Module,
		detail: '`ifnone` search condition',
		documentation: {
			value:
`
\`ifnone\`: string or number or boolean, optional, the value to return if nothing is found.  By default, this results in an error and aborts the script;
`
		}
	},
	{
		label: 'what=',
		insertText: 'what=',
		kind: vscode.CompletionItemKind.Module,
		detail: '`what` search condition',
		documentation: {
			value:
`
\`what\`: string, optional, \`value\` or \`unit\`, what to return, the data feed value or the unit where it was posted, default is \`value\`;
`
		}
	},
	{
		label: 'type=',
		insertText: 'type=',
		kind: vscode.CompletionItemKind.Module,
		detail: '`type` search condition',
		documentation: {
			value:
`
\`type\`: string, optional, \`auto\` or \`string\`, what type to return, default is \`auto\`.  For \`auto\`, data feed values that look like valid IEEE754 numbers are returned as numbers, otherwise they are returned as strings.  If \`string\`, the returned value is always a string.  This setting affects only the values extracted from the database; if \`ifnone\` is used, the original type of \`ifnone\` value is always preserved.
`
		}
	},
	{
		label: 'attestors=',
		insertText: 'attestors=',
		kind: vscode.CompletionItemKind.Module,
		detail: '`attestors` search condition',
		documentation: {
			value:
`
\`attestors\`: string, list of attestor addresses delimited by \`:\` (usually only one attestor). \`this_address\` refers to the current AA.
`
		}
	},
	{
		label: 'balance',
		insertText: 'balance',
		kind: vscode.CompletionItemKind.Keyword,
		detail: '`balance` keyword',
		documentation: {
			value:
`
	\`{
	balance[asset]
	balance[aa_address][asset]
	}\`

Returns the balance of an AA in the specified asset.  If \`aa_address\` is omitted, the current AA is assumed.  \`asset\` can be \`base\` for bytes, asset id for any other asset, or any expression that evaluates to an asset id or \`base\` string.

This adds +1 to complexity count.

The returned balance includes the outputs received from the current trigger.

Examples:

	\`{
	balance[base]
	balance['n9y3VomFeWFeZZ2PcSEcmyBb/bI7kzZduBJigNetnkY=']
	balance['JVUJQ7OPBJ7ZLZ57TTNFJIC3EW7AE2RY'][base]
	}\`
`
		}
	},
	{
		label: 'response',
		insertText: 'response',
		kind: vscode.CompletionItemKind.Keyword,
		detail: '`response` keyword',
		documentation: {
			value:
`
	\`{
	response['key'] = 'text';
	}\`

Adds a key to the response object.  Response variables do not affect state, they are meant to only inform the caller, and other interested parties, about the actions performed by the AA.

Response vars can only be assigned, never read.  Response vars can be assigned and reassigned multiple times in any oscript.  They can hold values of types: string, number, boolean.  Attempting to assign an object would result in \`true\` being assigned.

Example: assigning these response variables

	\`{
	response['message'] = "set exchange rate to 0.123 tokens/byte";
	response['deposit'] = 2250000;
	}\`

will result in the following response object:

	\`{
	{
		"responseVars": {
				"message": "set exchange rate to 0.123 tokens/byte",
				"deposit": 2250000
		}
	}
	}\`
`
		}
	},
	{
		label: 'base',
		insertText: 'base',
		kind: vscode.CompletionItemKind.Text,
		detail: '`base` search value',
		documentation: {
			value:
`
\`asset\` can be \`base\` for bytes, asset id for any other asset, or any expression that evaluates to an asset id or \`base\` string.
`
		}
	},
	{
		label: 'pi',
		insertText: 'pi',
		kind: vscode.CompletionItemKind.Constant,
		detail: '`pi` 3.14159265358979',
		documentation: {
			value:
`
Pi constant rounded to 15 digits precision: 3.14159265358979.
`
		}
	},
	{
		label: 'e',
		insertText: 'e',
		kind: vscode.CompletionItemKind.Constant,
		detail: '`e` 2.71828182845905',
		documentation: {
			value:
`
Euler's number rounded to 15 digits precision: 2.71828182845905.
`
		}
	},
	{
		label: 'storage_size',
		insertText: 'storage_size',
		kind: vscode.CompletionItemKind.Constant,
		detail: '`storage_size` size in bytes',
		documentation: {
			value:
`
Size of AA’s storage occupied before the current invocation.
`
		}
	},
	{
		label: 'OR',
		labelAlts: ['or'],
		insertText: 'OR',
		kind: vscode.CompletionItemKind.Keyword,
		detail: '`OR` binary logical operator',
		documentation: {
			value:
`
Lowercase name \`or\` is also allowed.

Non-boolean operands are converted to booleans.

The result is a boolean.

If the first operand evaluates to \`true\`, second operand of \`OR\` is not evaluated.
`
		}
	},
	{
		label: 'AND',
		labelAlts: ['and'],
		insertText: 'AND',
		kind: vscode.CompletionItemKind.Keyword,
		detail: '`AND` binary logical operator',
		documentation: {
			value:
`
Lowercase name \`and\` is also allowed.

Non-boolean operands are converted to booleans.

The result is a boolean.

If the first operand evaluates to \`false\`, second operand of \`AND\` is not evaluated.
`
		}
	},
	{
		label: 'NOT',
		labelAlts: ['not'],
		insertText: 'NOT',
		kind: vscode.CompletionItemKind.Keyword,
		detail: '`NOT` unary logical operator',
		documentation: {
			value:
`
Lowercase name \`not\` is also allowed. The operator can be also written as \`!\`.

Non-boolean operand is converted to boolean.

The result is a boolean.
`
		}
	},
	{
		label: 'OTHERWISE',
		labelAlts: ['otherwise'],
		insertText: 'OTHERWISE',
		kind: vscode.CompletionItemKind.Keyword,
		detail: '`OTHERWISE` operator',
		documentation: {
			value:
`
Lowercase name \`otherwise\` is also allowed.

\`expr1 OTHERWISE expr2\`

If \`expr1\` is truthy, its result is returned and \`expr2\` is not evaluated. Otherwise, \`expr2\` is evaluated and its result returned.
`
		}
	},
	{
		label: '||',
		insertText: '||',
		kind: vscode.CompletionItemKind.Operator,
		detail: '`||` string concatenation operator',
		documentation: {
			value:
`
Returns a string that contains the concatenation of two strings.

	\`{
		$key = 'balance_' || trigger.address
	}\`

`
		}
	}
]