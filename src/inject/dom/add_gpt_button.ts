import { wait } from "../../utils/wait";

const gptIconSrc = chrome.runtime.getURL("icons/chatGPT.svg");
const gptIconErrorSrc = chrome.runtime.getURL("icons/chatGPT_error.svg");
const tweetTypes: Array<{ emoji: string; type: string; }> = [
    { emoji: '👍', type: 'supportive' },
    { emoji: '😃', type: 'excited' },
    { emoji: '😑', type: 'Unimpressed' },
    { emoji: '😠', type: 'Angry' },
    { emoji: '🤔', type: 'analytical ' },
    { emoji: '🤣', type: 'humorous' },
    { emoji: '🙄', type: 'passive aggressive'}
];

export const addGPTButton = async (toolbarEl: Element, onClick: (type: string) => Promise<void>) => {
    const state = await chrome.storage.local.get('isRandomType');
    const isRandomType = state.isRandomType ?? false;

    if (isRandomType) {
        addGPTButtonRandom(toolbarEl, onClick);
    } else {
        addGPTButtonWithType(toolbarEl, onClick);
    }
}

const addGPTButtonRandom = (toolbarEl: Element, onClick: (type: string) => Promise<void>) => {
    const buttonContainer = toolbarEl.children[0]; // doesn't have it's own readable class / testId

    // create icon component
    const gptIcon = document.createElement('img');
    gptIcon.classList.add("gptIcon");
    gptIcon.setAttribute("src", gptIconSrc);

    // create icon wrapper
    const gptIconWrapper = document.createElement('div');
    gptIconWrapper.classList.add("gptIconWrapper");
    gptIconWrapper.appendChild(gptIcon);
    gptIconWrapper.onclick = async () => {
        gptIconWrapper.classList.add("loading");
        const typeObj = tweetTypes[Math.floor(Math.random() * tweetTypes.length)];
        await onClick(typeObj.type);
        gptIconWrapper.classList.remove("loading");
    }

    // attach to container
    buttonContainer.appendChild(gptIconWrapper);
}

export const showErrorButton = async (toolbarEl: Element) => {
    const gptIcon = toolbarEl.querySelector(".gptIcon");
    if (gptIcon) {
        gptIcon.setAttribute("src", gptIconErrorSrc);
        gptIcon.classList.add("error");
    }
    await wait(5000);
    gptIcon?.setAttribute("src", gptIconSrc);
    gptIcon?.classList.remove("error");
}