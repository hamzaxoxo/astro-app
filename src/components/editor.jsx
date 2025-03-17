import { useState, useEffect, useRef, useMemo } from 'preact/hooks';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const LICENSE_KEY = 'YOUR_LICENSE_KEY_HERE';

export default function Editor() {
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const cloud = useCKEditorCloud({ version: '44.1.0' });

    useEffect(() => {
        setIsLayoutReady(true);

        return () => setIsLayoutReady(false);
    }, []);

    const { ClassicEditor, editorConfig } = useMemo(() => {
        if (cloud.status !== 'success' || !isLayoutReady) {
            return {};
        }

        const { ClassicEditor, AutoLink, Autosave, Bold, Essentials, Italic, Link, Paragraph } = cloud.CKEditor;

        return {
            ClassicEditor,
            editorConfig: {
                toolbar: {
                    items: ['bold', 'italic', '|', 'link'],
                    shouldNotGroupWhenFull: false
                },
                plugins: [AutoLink, Autosave, Bold, Essentials, Italic, Link, Paragraph],
                initialData:'',
                licenseKey: LICENSE_KEY,
                placeholder: 'Type or paste your content here!'
            }
        };
    }, [cloud, isLayoutReady]);

    return (
        <div className="main-container">
            <div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
                <div className="editor-container__editor">
                    <div ref={editorRef}>{ClassicEditor && editorConfig && <CKEditor editor={ClassicEditor} config={editorConfig} />}</div>
                </div>
            </div>
        </div>
    );
}