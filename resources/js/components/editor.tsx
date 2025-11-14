'use client';

import { $generateNodesFromDOM } from '@lexical/html';
import { AutoLinkNode, LinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, ListItemNode, ListNode, REMOVE_LIST_COMMAND } from '@lexical/list';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { $getRoot } from 'lexical';

import { cn } from '@/lib/utils';
import { $generateHtmlFromNodes } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import { useEffect, useRef } from 'react';

function Toolbar({ initialHtml }: { initialHtml: string }) {
    const [editor] = useLexicalComposerContext();
    const initialAppliedRef = useRef(false);

    useEffect(() => {
        if (!initialHtml || initialAppliedRef.current) return;

        initialAppliedRef.current = true;

        editor.update(() => {
            const parser = new DOMParser();
            const dom = parser.parseFromString(initialHtml, 'text/html');
            const nodes = $generateNodesFromDOM(editor, dom);
            const root = $getRoot();
            root.clear();
            root.append(...nodes);
        });
    }, [editor, initialHtml]);

    const format = (type: 'bold' | 'italic' | 'underline' | 'strikethrough') => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
    };

    const insertLink = () => {
        const url = prompt('Enter URL');
        if (url) {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
        }
    };

    return (
        <div className="mb-2 flex flex-wrap gap-2 border-b pb-2">
            <button type='button' onClick={() => format('bold')} className="rounded border px-2 py-1 font-bold">
                B
            </button>
            <button type='button' onClick={() => format('italic')} className="rounded border px-2 py-1 italic">
                I
            </button>
            <button type='button' onClick={() => format('underline')} className="rounded border px-2 py-1 underline">
                U
            </button>
            <button type='button' onClick={() => format('strikethrough')} className="rounded border px-2 py-1 line-through">
                S
            </button>

            <button type='button' onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)} className="rounded border px-2 py-1">
                • List
            </button>
            <button type='button' onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)} className="rounded border px-2 py-1">
                1. List
            </button>
            <button type='button' onClick={() => editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)} className="rounded border px-2 py-1">
                Remove List
            </button>

            <button type='button' onClick={insertLink} className="rounded border px-2 py-1 text-blue-400 underline">
                Link
            </button>
        </div>
    );
}

type Props = {
    onChange: (html: string) => void;
    initialHtml?: string;
    className?: string;
};

export default function Editor({ onChange, initialHtml = '', className }: Props) {
    const debounceRef = useRef<number | null>(null);

    const initialConfig = {
        namespace: 'DemoEditor',
        theme: {
            paragraph: 'mb-2',
            text: {
                bold: 'font-bold',
                italic: 'italic',
                underline: 'underline',
                strikethrough: 'line-through',
            },
            list: {
                ul: 'list-disc ml-6',
                ol: 'list-decimal ml-6',
            },
            link: 'text-blue-400 underline cursor-pointer',
        },
        onError(error: Error) {
            console.error(error);
        },
        nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode, AutoLinkNode],
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div className={cn('relative rounded border p-4', className)}>
                <Toolbar initialHtml={initialHtml} />
                <RichTextPlugin
                    contentEditable={<ContentEditable className="min-h-[200px] outline-none" />}
                    placeholder={<div className="absolute sm:top-1/4 top-28 -translate-y-1/5 cursor-text text-gray-400 select-none">Write something…</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <ListPlugin />
                <LinkPlugin />
                <OnChangePlugin
                    onChange={(editorState, editor) => {
                        editorState.read(() => {
                            const html = $generateHtmlFromNodes(editor);
                            // simple debounce to avoid parent re-renders on every micro-change
                            if (debounceRef.current) {
                                window.clearTimeout(debounceRef.current);
                            }
                            debounceRef.current = window.setTimeout(() => {
                                onChange(html);
                            }, 250); // tweak delay as desired
                        });
                    }}
                />
            </div>
        </LexicalComposer>
    );
}
