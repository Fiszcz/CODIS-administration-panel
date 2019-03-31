export const openInNewTab = (content: any) => {
    const tab = window.open('about:blank', '_blank');
    if (tab) {
        tab.document.write(JSON.stringify(content));
        tab.document.close();
    }
};
