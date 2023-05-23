# dynamodb-doc-client

[AWS DynamoDB Document Client](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html) module for [Nest](https://github.com/nestjs/nest).

## Installation

```bash
$ npm install --save @bippo-nest/dynamodb-doc-client
```

## Quick Start

**1. Add import into your app module**

`src/app.module.ts`

```ts
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DynamoDBDocClientModule } from '@bippo-nest/dynamodb-doc-client';

@Module({
  imports: [DynamoDBDocClientModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

`forRoot()` optionally accepts the following objects in this order:
[DynamoDBClientConfig](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#constructor-property),
[marshallOptions](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/interfaces/_aws_sdk_util_dynamodb.marshallOptions.html),
[unmarshallOptions](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/interfaces/_aws_sdk_util_dynamodb.unmarshallOptions.html)

**2. Inject and use your model**

`src/app.service.ts`

```ts
import { Injectable } from '@nestjs/common';

import { DynamoDBDocClientService } from '@bippo-nest/dynamodb-doc-client';

@Injectable()
export class AppService {
  constructor(private readonly docClient: DynamoDBDocClientService) {}

  async createData() {
    const params = {
      TableName: 'MyTable',
      Item: {
        pk: 'myPK',
        sk: '001',
        foo: 17,
        bar: 'what a wonderful day',
      },
    };
    try {
      await this.docClient.clientPut(params);
    } catch (error) {
      console.log(error);
    }
  }
}
```

## Pass-Through Methods

All methods that start with the `client` prefix pass arguments directly to the document client

- [clientBatchGet](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#batchGet-property)
- [clientBatchWrite](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#batchWrite-property)
- [clientDelete](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#delete-property)
- [clientGet](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property)
- [clientPut](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property)
- [clientQuery](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property)
- [clientScan](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property)
- [clientTransactGet](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#transactGet-property)
- [clientTransactWrite](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#transactWrite-property)
- [clientUpdate](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property)
