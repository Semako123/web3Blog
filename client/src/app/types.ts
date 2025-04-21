type blogMetadata = {
    title: string;
    description: FormDataEntryValue | null;
    author: `0x${string}`;
    tags: string[];
    content_cid: string;
    timestamp: number;
}

type blogSchema = blogMetadata & {
    id: string;
    likes: number;
}

type BlogMintedEvent = {
  owner: `0x${string}`;
  tokenId: bigint;
  timestamp: bigint;
  ipfsURI: string;
};


export {type blogMetadata, type blogSchema, type BlogMintedEvent}