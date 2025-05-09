import { createBlog } from "@/app/api/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { YooEditor } from "@yoopta/editor";
import {
  Dispatch,
  FormEvent,
  FormEventHandler,
  SetStateAction,
  useActionState,
  useState,
} from "react";
import TagInput from "./TagInput";
import { Textarea } from "./ui/textarea";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import BlogTokenABI from "@/abi/BlogToken.json";
import { UploadResponse } from "pinata";
import { Abi, decodeEventLog, parseEventLogs } from "viem";
import { getMetadata, uploadMetadata } from "@/app/api/db/db_actions";
import { blogMetadata, BlogMintedEvent } from "@/app/types";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/services/wagmi/config";

type submitProps = {
  editor: YooEditor;
  openForm: boolean;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
};

//  const handleMint = async () => {
//     const res = await createBlog(editor.getEditorValue(), editor.getMarkdown(editor.getEditorValue()))

//     console.log(res)
//   }

export function SubmitBlogDialog({
  editor,
  openForm,
  setOpenForm,
}: submitProps) {
  return (
    <Dialog open={openForm} onOpenChange={setOpenForm}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete the form to mint your creation</DialogTitle>
          <SubmitForm editor={editor} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

const SubmitForm = ({ editor }: { editor: YooEditor }) => {
  const editorValue = editor.getEditorValue();
  const editorJSON = JSON.stringify(editorValue);
  const editorMarkdown = editor.getMarkdown(editorValue);
  const [tags, setTags] = useState<string[]>([]);
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const {
        blogCID,
        metadata,
      }: { blogCID: UploadResponse; metadata: blogMetadata } = await createBlog(
        tags,
        address!,
        editorJSON,
        editorMarkdown,
        formData
      );

      const txhash = await writeContractAsync({
        abi: BlogTokenABI,
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        functionName: "mint",
        args: [address!, blogCID.cid],
      });

      const txreceipt = await waitForTransactionReceipt(config, {
        hash: txhash,
      });

      const logs = parseEventLogs({
        abi: BlogTokenABI as Abi,
        logs: txreceipt.logs,
      });

      const { args } = logs[2];

      // Now args is already correct
      const { tokenId } = args as BlogMintedEvent;
      const blogData = {
        ...metadata,
        id: tokenId.toString(),
        likes: 0,
      };

      await uploadMetadata(blogData);
      await getMetadata();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Textarea
          name="description"
          placeholder="Give a brief description to this masterpiece"
        />
        <TagInput tags={tags} setTags={setTags} />
        <button role="submit">Submit</button>
      </form>
    </div>
  );
};
