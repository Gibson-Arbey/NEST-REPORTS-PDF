import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers/date-formatter';

const logo: Content = {
  image: 'assets/images/logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

interface HeaderOptions {
  title?: string;
  subTitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
  const { title, showLogo = true, showDate = true } = options;

  const columns: Content[] = [];

  if (showLogo) {
    columns.push(logo);
  }

  if (title) {
    columns.push({
      text: title,
      style: { bold: true },
    });
  }

  if (showDate) {
    columns.push({
      text: DateFormatter.getDDMMMMYYYY(new Date()),
      alignment: 'right',
      margin: [20, 20],
    });
  }

  return { columns };
};
