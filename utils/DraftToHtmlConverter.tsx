import draftToHtml from 'draftjs-to-html';
import { ContentState, convertToRaw, RawDraftContentState } from 'draft-js';

export const draftToHtmlConverter = (
  draftContent: ContentState | undefined
): string => {
  if (!draftContent || !draftContent.getBlockMap) {
    return '';
  }

  try {
    const rawContentState: RawDraftContentState = convertToRaw(draftContent);
    const html: string = draftToHtml(rawContentState);
    return html;
  } catch (error) {
    return '';
  }
};
