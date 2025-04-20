type blogMetadata = {
    title: string;
    description: FormDataEntryValue | null;
    author: `0x${string}`;
    tags: string[];
    content: string;
    timestamp: number;
}

export {type blogMetadata}