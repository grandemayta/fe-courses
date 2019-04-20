import _page from 'page';
import { getUserSession } from 'utils/session-wrapper';

const handleSubHeader = (eventName, detail) => {
  document.dispatchEvent(new CustomEvent(eventName, { detail }));
};

export const loadFeature = (path, context) => {
  import(`features/${path}`).then(({ default: Feature }) => {
    const { params, path } = context;

    if (path === '/') {
      handleSubHeader('subheader:disable');
    } else {
      params.title = title => handleSubHeader('subheader:enable', { title });
    }
    params.userSession = getUserSession();
    const feature = new Feature(document.querySelector('#root'), params);
    feature.load();
  });
};

export const page = _page;
