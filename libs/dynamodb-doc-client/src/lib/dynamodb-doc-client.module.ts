import { DynamicModule, Global, Module } from '@nestjs/common';
import { marshallOptions, unmarshallOptions } from '@aws-sdk/util-dynamodb';
import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';

import { DYNAMODB_CLIENT_OPTIONS, DYNAMODB_MARSHALL_OPTIONS, DYNAMODB_UNMARSHALL_OPTIONS } from './tokens';
import { DynamoDBDocClientService } from './dynamodb-doc-client.service';

@Global()
@Module({})
export class DynamoDBDocClientModule {
  static forRoot(
    options: DynamoDBClientConfig = {},
    marshallOptions: marshallOptions = {
      convertEmptyValues: false,
      removeUndefinedValues: false,
      convertClassInstanceToMap: false,
    },
    unmarshallOptions: unmarshallOptions = {
      wrapNumbers: false,
    }
  ): DynamicModule {
    return {
      module: DynamoDBDocClientModule,
      providers: [
        DynamoDBDocClientService,
        {
          provide: DYNAMODB_CLIENT_OPTIONS,
          useValue: options,
        },
        {
          provide: DYNAMODB_MARSHALL_OPTIONS,
          useValue: marshallOptions,
        },
        {
          provide: DYNAMODB_UNMARSHALL_OPTIONS,
          useValue: unmarshallOptions,
        },
      ],
      exports: [DynamoDBDocClientService],
    };
  }
}
