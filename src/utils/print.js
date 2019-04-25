import { message } from 'antd';

export async function printAllOrder(header, body) {
  const LODOP = window.getLodop();
  LODOP.SET_LICENSES(
    '',
    '47BD6E531EA942E14CC033843EB54049',
    'C94CEE276DB2187AE6B65D56B3FC2848',
    ''
  );
  LODOP.PRINT_INIT('打印配送线路总单');
  LODOP.SET_PRINT_PAGESIZE(1, 2400, 2794, 'A3');
  const strBodyStyle =
    '<style>table tr td { border: 1 solid #000000;border-collapse:collapse;font-size:12px; } th{ border:none;border-collapse:collapse;font-size:12px;line-height:30px;}</style>';
  LODOP.ADD_PRINT_TABLE(128, '5%', '80%', 314, strBodyStyle + body);
  LODOP.SET_PRINT_STYLEA(0, 'Vorient', 3);
  LODOP.ADD_PRINT_HTM(26, '5%', '90%', 109, header);
  LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1);
  LODOP.SET_PRINT_STYLEA(0, 'LinkedItem', 1);

  LODOP.PRINT();
  // LODOP.PREVIEW();

  message.info('开始打印配送线路总单！');
}

export async function printChildOrder(header, body) {
  const LODOP = window.getLodop();
  LODOP.SET_LICENSES(
    '',
    '47BD6E531EA942E14CC033843EB54049',
    'C94CEE276DB2187AE6B65D56B3FC2848',
    ''
  );
  LODOP.PRINT_INIT('打印配送社区线路分单');
  LODOP.SET_PRINT_PAGESIZE(1, 2400, 1400, 'A3');
  const strBodyStyle =
    '<style>table tr td { border: 1 solid #000000;border-collapse:collapse;font-size:12px; } th{ border:none;border-collapse:collapse;font-size:12px;line-height:30px;}</style>';
  LODOP.ADD_PRINT_TABLE(90, '5%', '80%', 414, strBodyStyle + body);
  LODOP.SET_PRINT_STYLEA(0, 'Vorient', 3);
  LODOP.ADD_PRINT_HTM(6, '5%', '90%', 109, header);
  LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1);
  LODOP.SET_PRINT_STYLEA(0, 'LinkedItem', 1);

  LODOP.PRINT();
  // LODOP.PREVIEW();

  message.info('开始打印配送社区线路分单！');
}

export async function printChildA4Order(header, body) {
  const LODOP = window.getLodop();
  LODOP.SET_LICENSES(
    '',
    '47BD6E531EA942E14CC033843EB54049',
    'C94CEE276DB2187AE6B65D56B3FC2848',
    ''
  );
  LODOP.PRINT_INIT('打印配送社区线路分单');
  LODOP.SET_PRINT_PAGESIZE(1, 2100, 2970, 'A3');
  const strBodyStyle =
    '<style>table tr td { border: 1 solid #000000;border-collapse:collapse;font-size:12px; } th{ border:none;border-collapse:collapse;font-size:12px;line-height:30px;}</style>';
  LODOP.ADD_PRINT_TABLE(55, '5%', '80%', 514, strBodyStyle + body);
  LODOP.SET_PRINT_STYLEA(0, 'Vorient', 3);
  LODOP.ADD_PRINT_HTM(16, '5%', '90%', 109, header);
  LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1);
  LODOP.SET_PRINT_STYLEA(0, 'LinkedItem', 1);

  LODOP.PREVIEW();

  message.info('开始打印配送社区线路分单！');
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
