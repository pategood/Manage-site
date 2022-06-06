const dealFileUrl = (url = '', dealFn: Function | null = null) => {
  // eslint-disable-next-line @iceworks/best-practices/no-http-url
  return dealFn ? dealFn(url) : url.replace('http:', '');
};

export { dealFileUrl };
