"use client";
import YooptaEditor, {
  createYooptaEditor,
  Elements,
  Blocks,
  useYooptaEditor,
  YooptaContentValue,
  YooptaOnChangeOptions,
  YooptaPlugin,
  SlateElement,
} from "@yoopta/editor";

import Paragraph from "@yoopta/paragraph";
import Blockquote from "@yoopta/blockquote";
import Embed from "@yoopta/embed";
import Image from "@yoopta/image";
import Link from "@yoopta/link";
import Callout from "@yoopta/callout";
import Video from "@yoopta/video";
import File from "@yoopta/file";
import Accordion from "@yoopta/accordion";
import { NumberedList, BulletedList, TodoList } from "@yoopta/lists";
import {
  Bold,
  Italic,
  CodeMark,
  Underline,
  Strike,
  Highlight,
} from "@yoopta/marks";
import { HeadingOne, HeadingThree, HeadingTwo } from "@yoopta/headings";
import Code from "@yoopta/code";
import Table from "@yoopta/table";
import Divider from "@yoopta/divider";
import ActionMenuList, {
  DefaultActionMenuRender,
} from "@yoopta/action-menu-list";
import Toolbar, { DefaultToolbarRender } from "@yoopta/toolbar";
import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool";

// import { uploadToCloudinary } from "@/utils/cloudinary";
import { useMemo, useRef, useState } from "react";
import NotionToolbar from "./Toolbar";

const plugins = [
  Paragraph,
  Table,
  Divider.extend({
    elementProps: {
      divider: (props) => ({
        ...props,
        color: "#007aff",
      }),
    },
  }),
  Accordion,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Blockquote,
  Callout,
  NumberedList,
  BulletedList,
  TodoList,
  Code,
  Link,
  Embed,
  // Image.extend({
  //   options: {
  //     async onUpload(file) {
  //       const data = await uploadToCloudinary(file, "image");

  //       return {
  //         src: data.secure_url,
  //         alt: "cloudinary",
  //         sizes: {
  //           width: data.width,
  //           height: data.height,
  //         },
  //       };
  //     },
  //   },
  // }),
  // Video.extend({
  //   options: {
  //     onUpload: async (file) => {
  //       const data = await uploadToCloudinary(file, "video");
  //       return {
  //         src: data.secure_url,
  //         alt: "cloudinary",
  //         sizes: {
  //           width: data.width,
  //           height: data.height,
  //         },
  //       };
  //     },
  //     onUploadPoster: async (file) => {
  //       const image = await uploadToCloudinary(file, "image");
  //       return image.secure_url;
  //     },
  //   },
  // }),
  // File.extend({
  //   options: {
  //     onUpload: async (file) => {
  //       const response = await uploadToCloudinary(file, "auto");
  //       return {
  //         src: response.secure_url,
  //         format: response.format,
  //         name: response.name,
  //         size: response.bytes,
  //       };
  //     },
  //   },
  // }),
] as unknown as YooptaPlugin<
  Record<string, SlateElement>,
  Record<string, unknown>
>[];

const TOOLS = {
  ActionMenu: {
    render: DefaultActionMenuRender,
    tool: ActionMenuList,
  },
  Toolbar: {
    render: DefaultToolbarRender,
    tool: Toolbar,
  },
  LinkTool: {
    render: DefaultLinkToolRender,
    tool: LinkTool,
  },
};

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

const INITIAL_VALUE = {
  "a3dcc117-7a3a-410f-98fa-8cbf620acebf": {
    id: "a3dcc117-7a3a-410f-98fa-8cbf620acebf",
    value: [
      {
        id: "e3599711-7674-498b-bcba-099b600d6eb3",
        type: "heading-one",
        children: [
          {
            text: "Let's start from lorem ipsum",
          },
        ],
        props: {
          nodeType: "block",
        },
      },
    ],
    type: "HeadingOne",
    meta: {
      order: 0,
      depth: 0,
    },
  },
  "40fb1893-cc80-43c9-9a4c-95ce7ebd0cd8": {
    id: "40fb1893-cc80-43c9-9a4c-95ce7ebd0cd8",
    value: [
      {
        id: "2221b81d-11c3-4160-b40f-6db00a0af5b9",
        type: "paragraph",
        children: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse facilisis, quam in malesuada convallis, ipsum quam ultricies dui, in faucibus elit metus a erat. Nam faucibus nunc eu diam vestibulum cursus. ",
          },
          {
            text: "Duis vestibulum ornare risus, nec elementum turpis rutrum eu. Aenean quis bibendum ex",
            highlight: {
              color: "#B35588",
            },
          },
          {
            text: ". Cras nibh quam, cursus quis pharetra eu, varius nec nulla. Ut nisi tellus, venenatis semper quam ac, cursus convallis velit. Curabitur dictum sit amet mi condimentum placerat. Etiam id velit sed lorem rhoncus lacinia ut in justo. Integer eros mi, rhoncus nec sapien ut, mollis volutpat magna. Vivamus auctor mollis varius. Vestibulum semper enim convallis augue vehicula aliquet.",
          },
        ],
        props: {
          nodeType: "block",
        },
      },
    ],
    type: "Paragraph",
    meta: {
      order: 1,
      depth: 0,
    },
  },
  "1fcbb785-ec60-4f49-8f92-b0402c54f96d": {
    id: "1fcbb785-ec60-4f49-8f92-b0402c54f96d",
    type: "Blockquote",
    meta: {
      order: 2,
      depth: 0,
    },
    value: [
      {
        id: "b1596a4c-b0e0-4277-96f1-54e03b7401c3",
        type: "blockquote",
        children: [
          {
            text: "Pellentesque eu sem nulla. Maecenas gravida at urna at mollis. Sed quis odio blandit, fermentum sapien vel, ",
          },
          {
            text: "tempor mauris",
            bold: true,
          },
          {
            text: ". Donec a tempor sem, vitae suscipit augue. Donec nec nisi vel neque mollis interdum. Mauris commodo, lectus et bibendum lacinia, leo leo sodales lectus, id interdum nisi neque sit amet eros. Etiam a malesuada diam. Aenean varius diam quis lectus mattis, quis accumsan ex dictum. In interdum consequat placerat. Donec aliquet ullamcorper mauris, at tincidunt metus tristique eu.",
          },
        ],
        props: {
          nodeType: "block",
        },
      },
    ],
  },
  "45a7bbde-f67f-4ce9-be89-0801d40e6fbe": {
    id: "45a7bbde-f67f-4ce9-be89-0801d40e6fbe",
    value: [
      {
        id: "33c620da-759d-4a4b-a900-75db1f7fdb77",
        type: "paragraph",
        children: [
          {
            text: "Proin rutrum sem in ex ultricies, nec imperdiet nunc hendrerit. Aliquam erat volutpat. Vestibulum vel urna vel dui mattis cursus. Vestibulum eget eleifend augue. Ut vehicula quam cursus egestas interdum. Aliquam facilisis nisl lorem, vitae porttitor eros efficitur vel. Fusce porttitor finibus dolor sit amet convallis. Suspendisse elementum nibh quis eleifend dictum. Duis sit amet augue nec nunc luctus rutrum sed id tellus. Vivamus sollicitudin, massa at congue cursus, tortor purus vehicula ante, non vehicula tellus neque eu nibh. Etiam in ante ac quam mollis mattis et efficitur velit.",
          },
        ],
        props: {
          nodeType: "block",
        },
      },
    ],
    type: "Paragraph",
    meta: {
      order: 3,
      depth: 0,
    },
  },
  "97f69998-41b0-4e70-a71b-1218b639bd00": {
    id: "97f69998-41b0-4e70-a71b-1218b639bd00",
    type: "Callout",
    meta: {
      order: 4,
      depth: 0,
    },
    value: [
      {
        id: "76403bf9-e198-4cce-a2a7-0dd641da958a",
        type: "callout",
        children: [
          {
            text: "Cras sagittis lacinia elit et blandit. Vivamus cursus leo sed orci sollicitudin, sit amet fringilla libero ultrices. Nulla id sollicitudin lorem, ac scelerisque magna. In cursus erat eget nibh malesuada iaculis. Vivamus pretium ipsum a nulla tincidunt aliquet. Fusce malesuada semper velit id elementum. Fusce ornare, quam at efficitur eleifend, velit sem consectetur felis, ut facilisis est nibh sit amet nunc. Maecenas ante felis, fringilla eget odio vel, consequat malesuada tellus. ",
          },
          {
            text: "Fusce quis ligula mi",
            highlight: {
              backgroundColor: "#FAECEC",
            },
          },
          {
            text: ". Curabitur eu elit at metus eleifend mollis. Sed pretium, ex in elementum venenatis, quam justo facilisis urna, ac tristique nisl ligula et ipsum. Ut venenatis egestas condimentum. Fusce eu sem fermentum felis dignissim vulputate in vel sem. Etiam finibus massa non mauris sollicitudin venenatis. Donec cursus tortor et ipsum lacinia, non semper elit pretium. Nullam ut augue facilisis, porta ante eu, feugiat nisl.",
          },
        ],
        props: {
          nodeType: "block",
          theme: "info",
        },
      },
    ],
  },
  "f7602b49-36cb-4d48-9c62-5f4a61bec4f3": {
    id: "f7602b49-36cb-4d48-9c62-5f4a61bec4f3",
    value: [
      {
        id: "d87d8fe2-baf4-43fd-835d-a3ed7d5f8300",
        type: "paragraph",
        children: [
          {
            text: "Nullam neque tortor, efficitur a mollis id, sollicitudin vitae turpis. Cras vulputate vestibulum gravida. Nunc iaculis turpis erat, nec scelerisque est elementum eu. Nullam neque nibh, congue sit amet neque in, maximus tincidunt ligula. Maecenas justo augue, dictum non lorem vitae, tincidunt finibus arcu. Nam neque massa, consectetur vel consequat at, volutpat at risus. Donec finibus efficitur metus. Phasellus non lobortis mi. Suspendisse potenti. Ut lorem urna, mollis sit amet facilisis ut, commodo sit amet diam. Donec egestas, leo vitae euismod rhoncus, dui dui ullamcorper dolor, id rhoncus dui nisl eget sem. Pellentesque id lorem libero. Praesent ante orci, egestas ac pretium ut, auctor nec sem. Duis quis mollis eros, ut mollis nisi. Aenean in dui euismod, luctus ante vel, egestas nunc.",
          },
        ],
        props: {
          nodeType: "block",
        },
      },
    ],
    type: "Paragraph",
    meta: {
      order: 5,
      depth: 0,
    },
  },
  "d0dffb17-02dd-4b69-94b8-6f598facde63": {
    id: "d0dffb17-02dd-4b69-94b8-6f598facde63",
    value: [
      {
        id: "d41fe142-9502-4464-86e3-b1494d63bea5",
        type: "heading-two",
        children: [
          {
            text: "Not bad, go to media component",
          },
        ],
        props: {
          nodeType: "block",
        },
      },
    ],
    type: "HeadingTwo",
    meta: {
      order: 6,
      depth: 0,
    },
  },
  "046ec151-7d1d-4c6c-92a4-fe834b0c0643": {
    id: "046ec151-7d1d-4c6c-92a4-fe834b0c0643",
    value: [
      {
        id: "c51ba1fe-c7a5-409e-8379-afc823e7b2d5",
        type: "bulleted-list",
        children: [
          {
            text: "Proin rutrum sem in ex ultricies, nec imperdiet nunc hendrerit. Aliquam erat volutpat. Vestibulum vel urna vel dui mattis cursus. Vestibulum eget eleifend augue. Ut vehicula quam cursus egestas interdum. Aliquam facilisis nisl lorem, vitae porttitor eros efficitur vel. Fusce porttitor finibus dolor sit amet convallis. Suspendisse elementum nibh quis eleifend dictum. Duis sit amet augue nec nunc luctus rutrum sed id tellus. Vivamus sollicitudin, massa at congue cursus, tortor purus vehicula ante, non vehicula tellus neque eu nibh. Etiam in ante ac quam mollis mattis et efficitur velit.",
          },
        ],
        props: {
          nodeType: "block",
        },
      },
    ],
    type: "BulletedList",
    meta: {
      order: 11,
      depth: 0,
    },
  },
  "941a4223-0341-4690-ae79-fd0651dd3cc7": {
    id: "941a4223-0341-4690-ae79-fd0651dd3cc7",
    value: [
      {
        id: "ed7fba07-fdfb-49bd-a671-28c6f812845c",
        type: "bulleted-list",
        children: [
          {
            text: "Proin rutrum sem in ex ultricies, nec imperdiet nunc hendrerit. Aliquam erat volutpat. Vestibulum vel urna vel dui mattis cursus. Vestibulum eget eleifend augue. Ut vehicula quam cursus egestas interdum. Aliquam facilisis nisl lorem, vitae porttitor eros efficitur vel. Fusce porttitor finibus dolor sit amet convallis. Suspendisse elementum nibh quis eleifend dictum. Duis sit amet augue nec nunc luctus rutrum sed id tellus. Vivamus sollicitudin, massa at congue cursus, tortor purus vehicula ante, non vehicula tellus neque eu nibh. Etiam in ante ac quam mollis mattis et efficitur velit.",
          },
        ],
        props: {
          nodeType: "block",
        },
      },
    ],
    type: "BulletedList",
    meta: {
      order: 12,
      depth: 1,
    },
  },
  "d490bec3-e33a-4a8a-bbdd-6cef932e7d90": {
    id: "d490bec3-e33a-4a8a-bbdd-6cef932e7d90",
    value: [
      {
        id: "0e0e2199-ec7c-4033-9169-a443367a707e",
        type: "todo-list",
        children: [
          {
            text: "Pellentesque eu sem nulla. Maecenas gravida at urna at mollis. Sed quis odio blandit, fermentum sapien vel, tempor mauris. Donec a tempor sem, vitae suscipit augue. Donec nec nisi vel neque mollis interdum.",
          },
        ],
        props: {
          nodeType: "block",
          checked: false,
        },
      },
    ],
    type: "TodoList",
    meta: {
      order: 14,
      depth: 0,
    },
  },
  "712827f8-4ec1-4831-9ac5-0c84ea53e8c7": {
    id: "712827f8-4ec1-4831-9ac5-0c84ea53e8c7",
    value: [
      {
        id: "030121ba-b212-4201-aca0-3be40d5c3e23",
        type: "paragraph",
        children: [
          {
            text: "",
          },
        ],
        props: {
          nodeType: "block",
        },
      },
    ],
    type: "Paragraph",
    meta: {
      order: 13,
      depth: 0,
    },
  },
  "d296645c-29af-40ff-b340-e7313081251a": {
    id: "d296645c-29af-40ff-b340-e7313081251a",
    type: "TodoList",
    meta: {
      order: 15,
      depth: 1,
    },
    value: [
      {
        id: "0e0e2199-ec7c-4033-9169-a443367a707e",
        type: "todo-list",
        props: {
          nodeType: "block",
          checked: true,
        },
        children: [
          {
            text: "Mauris commodo, lectus et bibendum lacinia, leo leo sodales lectus, id interdum nisi neque sit amet eros. Etiam a malesuada diam. ",
          },
        ],
      },
    ],
  },
  "515ba508-f653-4a07-9843-446766314e4c": {
    id: "515ba508-f653-4a07-9843-446766314e4c",
    type: "TodoList",
    meta: {
      order: 16,
      depth: 1,
    },
    value: [
      {
        id: "0e0e2199-ec7c-4033-9169-a443367a707e",
        type: "todo-list",
        props: {
          nodeType: "block",
          checked: true,
        },
        children: [
          {
            text: "Aenean varius diam quis lectus mattis, quis accumsan ex dictum. In interdum consequat placerat. Donec aliquet ullamcorper mauris, at tincidunt metus tristique eu.",
          },
        ],
      },
    ],
  },
  "f4ce9638-59b7-459f-91d0-eebb89ec0859": {
    id: "f4ce9638-59b7-459f-91d0-eebb89ec0859",
    value: [
      {
        id: "c4554441-8826-45cf-bf7d-5e7ba2c555bc",
        type: "paragraph",
        children: [
          {
            text: "",
          },
        ],
        props: {
          nodeType: "block",
        },
      },
    ],
    type: "Paragraph",
    meta: {
      order: 17,
      depth: 0,
    },
  },
  "a5c9fecf-c564-4d80-a430-7434057ff5fd": {
    id: "a5c9fecf-c564-4d80-a430-7434057ff5fd",
    value: [
      {
        id: "bbd7e818-3c48-4c2d-9313-048524cfaed1",
        type: "heading-three",
        children: [
          {
            text: "Let's finish with Code plugin",
          },
        ],
        props: {
          nodeType: "block",
        },
      },
    ],
    type: "HeadingThree",
    meta: {
      order: 18,
      depth: 0,
    },
  },
  "21a1b855-aa5b-4fd6-8435-dfa5d460fc67": {
    id: "21a1b855-aa5b-4fd6-8435-dfa5d460fc67",
    value: [
      {
        id: "c5d04813-e50a-4d57-9fef-2cdebea85efd",
        type: "code",
        children: [
          {
            text: "import { Roboto } from 'next/font/google'\n \nconst roboto = Roboto({\n  weight: '400',\n  subsets: ['latin'],\n})\n \nexport default function MyApp({ Component, pageProps }) {\n  return (\n    <main className={roboto.className}>\n      <Component {...pageProps} />\n    </main>\n  )\n}",
          },
        ],
        props: {
          nodeType: "void",
          language: "javascript",
          theme: "VSCode",
        },
      },
    ],
    type: "Code",
    meta: {
      order: 19,
      depth: 0,
    },
  },
  "bf2fcbb8-80fc-4956-a287-75f4fefb7798": {
    id: "bf2fcbb8-80fc-4956-a287-75f4fefb7798",
    value: [
      {
        id: "1765b208-3b8a-4d1e-942c-bdd40ca55fdc",
        type: "paragraph",
        children: [
          {
            text: "",
          },
        ],
        props: {
          nodeType: "block",
        },
      },
    ],
    type: "Paragraph",
    meta: {
      order: 20,
      depth: 0,
    },
  },
};

function TextEditor() {
  const [value, setValue] = useState<YooptaContentValue>(INITIAL_VALUE);
  const editor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef(null);

  const onChange = (
    newValue: YooptaContentValue,
    options: YooptaOnChangeOptions
  ) => {
    setValue(newValue);
  };

  return (
    <div className="px-44 py-10 flex" ref={selectionRef}>
      <YooptaEditor
        editor={editor}
        plugins={plugins}
        tools={TOOLS}
        marks={MARKS}
        selectionBoxRoot={selectionRef}
        value={value}
        onChange={onChange}
        autoFocus
      />
    </div>
  );
}

export default TextEditor;
