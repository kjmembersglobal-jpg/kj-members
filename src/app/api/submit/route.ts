import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const SPREADSHEET_ID = '1r29QdJkBtePyggzX-o1EPOtaJWZ39nX13d4V5L8X02o';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!serviceAccountEmail || !privateKey) {
      console.error('Missing Google Service Account Credentials in environment variables.');
      return NextResponse.json(
        { error: '서버 설정 오류: 구글 서비스 계정 정보가 없습니다.' },
        { status: 500 }
      );
    }

    const serviceAccountAuth = new JWT({
      email: serviceAccountEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

    await doc.loadInfo(); 
    const sheet = doc.sheetsByIndex[0]; 

    const rowData = {
      '등록일시': new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
      '연락처': body.phone,
      '사는곳': body.location,
      '태어난해': body.birthYear,
      '신장_몸무게': body.heightWeight,
      '결혼유무': body.maritalStatus,
      '자녀유무': body.hasChildren,
      '자녀양육여부': body.parenting,
      '소득수준': body.income,
      '현재하는일': body.occupation,
      '일본어가능여부': body.japaneseLevel,
      '일본방문경험': body.japanVisit,
      '이상형': body.idealType,
      '흡연_음주': body.smokeDrink,
      '종교여부': body.religion,
      '부모님동거여부': body.liveWithParents,
      '상담가능시간대': body.consultTime,
    };

    await sheet.addRow(rowData);

    return NextResponse.json({ success: true, message: '성공적으로 등록되었습니다.' });

  } catch (error: any) {
    console.error('Google Sheets 연동 에러:', error);
    return NextResponse.json(
      { error: '데이터 저장 중 오류가 발생했습니다.', details: error.message },
      { status: 500 }
    );
  }
}
