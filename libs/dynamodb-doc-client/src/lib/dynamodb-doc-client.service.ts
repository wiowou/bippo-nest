import { Inject, Injectable } from '@nestjs/common';

import {
  BatchGetCommandInput,
  BatchGetCommandOutput,
  BatchWriteCommandInput,
  BatchWriteCommandOutput,
  DeleteCommandInput,
  DeleteCommandOutput,
  DynamoDBDocument,
  GetCommandInput,
  GetCommandOutput,
  PutCommandInput,
  PutCommandOutput,
  QueryCommandInput,
  QueryCommandOutput,
  ScanCommandInput,
  ScanCommandOutput,
  TransactGetCommandInput,
  TransactGetCommandOutput,
  TransactWriteCommandInput,
  TransactWriteCommandOutput,
  UpdateCommandInput,
  UpdateCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { marshallOptions, unmarshallOptions } from '@aws-sdk/util-dynamodb';

import { DYNAMODB_CLIENT_OPTIONS, DYNAMODB_MARSHALL_OPTIONS, DYNAMODB_UNMARSHALL_OPTIONS } from './tokens';

@Injectable()
export class DynamoDBDocClientService {
  private readonly dynamoClient: DynamoDBClient;
  private readonly docClient: DynamoDBDocument;

  constructor(
    @Inject(DYNAMODB_CLIENT_OPTIONS) private clientConfig: DynamoDBClientConfig,
    @Inject(DYNAMODB_MARSHALL_OPTIONS) private marshallOptions: marshallOptions,
    @Inject(DYNAMODB_UNMARSHALL_OPTIONS) private unmarshallOptions: unmarshallOptions
  ) {
    // Bare-bones DynamoDB Client
    this.dynamoClient = new DynamoDBClient(this.clientConfig);

    // Full document client
    this.docClient = DynamoDBDocument.from(this.dynamoClient, {
      marshallOptions: this.marshallOptions,
      unmarshallOptions: this.unmarshallOptions,
    });
  }

  public async clientBatchGet(params: BatchGetCommandInput): Promise<BatchGetCommandOutput> {
    return await this.docClient.batchGet(params);
  }

  public async clientBatchWrite(params: BatchWriteCommandInput): Promise<BatchWriteCommandOutput> {
    return await this.docClient.batchWrite(params);
  }

  public async clientDelete(params: DeleteCommandInput): Promise<DeleteCommandOutput> {
    return await this.docClient.delete(params);
  }

  public async clientGet(params: GetCommandInput): Promise<GetCommandOutput> {
    return await this.docClient.get(params);
  }

  public async clientPut(params: PutCommandInput): Promise<PutCommandOutput> {
    return await this.docClient.put(params);
  }

  public async clientQuery(params: QueryCommandInput): Promise<QueryCommandOutput> {
    return await this.docClient.query(params);
  }

  public async clientScan(params: ScanCommandInput): Promise<ScanCommandOutput> {
    return await this.docClient.scan(params);
  }

  public async clientTransactGet(params: TransactGetCommandInput): Promise<TransactGetCommandOutput> {
    return await this.docClient.transactGet(params);
  }

  public async clientTransactWrite(params: TransactWriteCommandInput): Promise<TransactWriteCommandOutput> {
    return await this.docClient.transactWrite(params);
  }

  public async clientUpdate(params: UpdateCommandInput): Promise<UpdateCommandOutput> {
    return await this.docClient.update(params);
  }
}
