import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// 스프레드시트 ID
const SPREADSHEET_ID = '1r29QdJkBtePyggzX-o1EPOtaJWZ39nX13d4V5L8X02o';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 환경 변수에서 서비스 계정 정보 가져오기
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
      '이름': body.name,
      '성별': body.gender,
      '생년월일': body.birthDate,
      '거주지역': body.location,
      '연락처': body.phone,
      '메신저ID': body.messenger,
      '직업': body.occupation,
      '신장': body.height,
      '결혼여부': body.maritalStatus,
      '이상형_및_바라는점': body.preferences
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
