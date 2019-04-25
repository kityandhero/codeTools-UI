function buildTreeItem(item, filterData, onlyLeafCanSelect) {
  const children = item.children || [];

  const o = {
    value: `${item.productTypeId}`,
    title: item.name,
    key: `${item.productTypeId}`,
    selectable: true,
  };

  if (onlyLeafCanSelect) {
    o.selectable = children.length === 0;
  }

  if (children.length > 0) {
    const co = [];
    children.forEach(one => {
      if (one.productTypeId !== filterData.productTypeId) {
        const ob = buildTreeItem(one, filterData, onlyLeafCanSelect);
        co.push(ob);
      }
    });
    o.children = co;
  }
  return o;
}

export default function buildTree(sourceData, showRoot, metaData, onlyLeafSelectable) {
  const onlyLeafCanSelect = onlyLeafSelectable || false;
  const filterData = {
    productTypeId: `${(metaData || { productTypeId: -1, name: '' }).productTypeId || -1}`,
    name: (metaData || { productTypeId: -1, name: '' }).name || '',
  };

  const initialData = [];

  if (showRoot) {
    initialData.push({
      productTypeId: '0',
      name: '根分类',
      defaultSet: '0',
    });
  }

  const sourceDataAll = initialData
    .concat(sourceData || [])
    .filter(
      data =>
        (data.productTypeId !== `${filterData.productTypeId}` &&
          (showRoot && data.defaultSet === '0')) ||
        !showRoot
    )
    .map(item => ({
      productTypeId: `${item.productTypeId}`,
      name: item.name,
      children: item.children,
    }));

  const result = [];
  sourceDataAll.forEach(item => {
    const o = buildTreeItem(item, filterData, onlyLeafCanSelect);
    result.push(o);
  });

  return result;
}
