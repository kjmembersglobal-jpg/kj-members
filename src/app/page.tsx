"use client";

import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState<"agreement" | "form">("agreement");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        form.reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === "agreement") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-blue-600 tracking-tight">
              KJ MEMBERS
            </h2>
            <p className="mt-4 text-center text-sm text-gray-600">
              서비스 이용을 위한 개인정보 처리방침 동의
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-6 h-96 overflow-y-auto text-sm text-gray-700 space-y-6 shadow-inner">
            <div>
              <h3 className="font-bold text-base mb-2">1. 개인정보의 처리 목적</h3>
              <p>KJ MEMBERS(이하 ‘케이제이멤버스’)는 회원 가입, 맞선 매칭 서비스 제공 및 고객 응대를 위해 개인정보를 수집하고 처리합니다. 이외에도 사후관리, 고객 상담, 이벤트 운영 등 서비스 품질 향상을 위한 활동에 활용됩니다.</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>회원 가입 및 본인 인증</li>
                <li>고객 맞춤형 프로필 매칭 제공</li>
                <li>서비스 이용에 따른 요금 정산 및 결제</li>
                <li>고객 문의 및 민원 처리, 공지사항 전달</li>
                <li>신규 서비스 개발 및 마케팅 활용 (동의 시)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">2. 개인정보의 처리 및 보유 기간</h3>
              <p>KJ MEMBERS는 개인정보 수집 시 명시한 보유 기간 또는 관련 법령에 따라 개인정보를 보관하며, 기간이 만료되거나 처리 목적이 달성된 경우 즉시 파기합니다.</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>회원 가입 정보: 회원 탈퇴 시까지 보관 (단, 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관)</li>
                <li>결제 및 계약 관련 정보: 전자상거래법 등 관계 법령에 따라 5년간 보관</li>
                <li>맞선 매칭 이력: 고객 재이용 및 분쟁 대비 목적, 탈퇴 후 최대 1년 보관</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">3. 개인정보의 제3자 제공</h3>
              <p>KJ MEMBERS는 정보주체의 사전 동의 없이 개인정보를 외부에 제공하지 않으며, 다음의 경우에만 예외로 제공할 수 있습니다.</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>법령에 특별한 규정이 있는 경우</li>
                <li>수사, 재판 등의 절차상 관계 기관의 요청이 있는 경우</li>
                <li>정보주체의 사전 동의를 받은 경우 (예: 프로필 교류 시)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">4. 정보주체의 권리 및 행사 방법</h3>
              <p>이용자는 KJ MEMBERS(www.kjmembers.com)를 통해 다음과 같은 권리를 언제든지 요청하실 수 있습니다.</p>
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>개인정보 열람 및 제공 요청</li>
                <li>정정 및 수정 요청</li>
                <li>삭제 요청</li>
                <li>처리 정지 요구</li>
              </ol>
              <p className="mt-2">요청은 온라인 문의, 이메일 또는 전화로 접수 가능하며, 본인 확인 후 신속하게 처리해 드립니다.</p>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">5. 처리하는 개인정보 항목</h3>
              <p>KJ MEMBERS는 맞선 중개 서비스 제공 및 회원 관리 목적으로 다음과 같은 개인정보 항목을 처리합니다.</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>필수 항목: 이름, 생년월일, 성별, 연락처(휴대폰, 이메일), 아이디, 비밀번호, 결제 정보, 접속 로그, IP</li>
                <li>선택 항목: 직업, 종교, 학력, 사진, 자기소개 등 (회원 동의 시)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">6. 개인정보의 파기</h3>
              <p>KJ MEMBERS는 개인정보의 보유 기간이 종료되거나 처리 목적이 달성된 경우 지체 없이 안전하게 파기합니다.</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>전자적 파일: 복구 불가능한 방식으로 영구 삭제</li>
                <li>종이 문서: 분쇄기 파쇄 또는 소각 처리</li>
                <li>파기 절차는 내부 전담자 승인 후 이루어지며, 파기 완료 여부를 기록 및 관리합니다.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">7. 개인정보의 안전성 확보 조치</h3>
              <p>KJ MEMBERS는 정보주체의 개인정보를 안전하게 보호하기 위해 다음과 같은 기술적·관리적 조치를 시행하고 있습니다.</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>암호화 저장: 비밀번호, 고유식별정보 등은 암호화 저장</li>
                <li>접근 권한 최소화 및 내부 교육 실시</li>
                <li>침입차단 시스템 등 보안 시스템 운영</li>
                <li>개인정보 처리 이력 기록 및 정기 모니터링</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">8. 개인정보 보호 책임자</h3>
              <p>KJ MEMBERS는 개인정보 보호와 관련된 민원 처리 및 피해 구제를 위한 책임자를 다음과 같이 지정하고 있습니다.</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>책임자 성명: 장현규</li>
                <li>연락처: 051-804-8017</li>
                <li>이메일: kjmembers.global.com</li>
              </ul>
              <p className="mt-2">기타 개인정보 관련 문의는 상기 연락처 또는 홈페이지 고객센터를 통해 접수해 주세요.</p>
            </div>

            <div>
              <h3 className="font-bold text-base mb-2">9. 개인정보 처리방침 변경</h3>
              <p>본 개인정보 처리방침은 법령 또는 내부 정책 변경 시 사전 고지 후 개정되며, 변경 사항은 홈페이지에 공지합니다.</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>최종 수정일: 2025년 5월 9일</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor="agree" className="ml-3 block text-sm font-medium text-gray-900 cursor-pointer">
              위 개인정보 처리방침을 꼼꼼히 읽었으며, 이에 동의합니다. (필수)
            </label>
          </div>

          <button
            onClick={() => setStep("form")}
            disabled={!agreed}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:bg-gray-400 transition-colors"
          >
            다음으로 (프로필 등록)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative">
          <button 
            onClick={() => setStep("agreement")}
            className="absolute left-0 top-1 text-sm text-gray-500 hover:text-gray-900"
          >
            &larr; 뒤로 가기
          </button>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-blue-600 tracking-tight">
            KJ MEMBERS
          </h2>
          <p className="mt-4 text-center text-sm text-gray-600">
            한국 남성 - 일본 여성 국제결혼 매칭 프로필 등록
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            
            {/* 기본 정보 */}
            <div className="sm:col-span-2 border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-900">기본 정보</h3>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">이름</label>
              <div className="mt-1">
                <input type="text" name="name" id="name" required className="py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">성별</label>
              <div className="mt-1">
                <select id="gender" name="gender" required className="py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option value="">선택해주세요</option>
                  <option value="남성 (한국)">남성 (한국)</option>
                  <option value="여성 (일본)">여성 (일본)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">생년월일</label>
              <div className="mt-1">
                <input type="date" name="birthDate" id="birthDate" required className="py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">거주 지역</label>
              <div className="mt-1">
                <input type="text" name="location" id="location" placeholder="예: 서울, 도쿄" required className="py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">연락처</label>
              <div className="mt-1">
                <input type="tel" name="phone" id="phone" required className="py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>

            <div>
              <label htmlFor="messenger" className="block text-sm font-medium text-gray-700">메신저 ID (카카오톡/LINE)</label>
              <div className="mt-1">
                <input type="text" name="messenger" id="messenger" required className="py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>

            {/* 상세 프로필 */}
            <div className="sm:col-span-2 border-b border-gray-200 pb-4 mt-6">
              <h3 className="text-lg font-medium text-gray-900">상세 프로필</h3>
            </div>

            <div>
              <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">직업</label>
              <div className="mt-1">
                <input type="text" name="occupation" id="occupation" className="py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>

            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700">신장 (cm)</label>
              <div className="mt-1">
                <input type="number" name="height" id="height" className="py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700">결혼 여부</label>
              <div className="mt-1">
                <select id="maritalStatus" name="maritalStatus" className="py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option value="">선택해주세요</option>
                  <option value="초혼">초혼</option>
                  <option value="재혼">재혼</option>
                </select>
              </div>
            </div>

            {/* 희망 조건 */}
            <div className="sm:col-span-2 border-b border-gray-200 pb-4 mt-6">
              <h3 className="text-lg font-medium text-gray-900">매칭 및 상담</h3>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="preferences" className="block text-sm font-medium text-gray-700">이상형 및 바라는 점</label>
              <div className="mt-1">
                <textarea id="preferences" name="preferences" rows={4} className="py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
              </div>
            </div>
          </div>

          {submitStatus === "success" && (
            <div className="p-4 rounded-md bg-green-50">
              <p className="text-sm font-medium text-green-800">성공적으로 등록되었습니다. 감사합니다!</p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="p-4 rounded-md bg-red-50">
              <p className="text-sm font-medium text-red-800">서버 에러(Google 연동 오류 등)로 인해 제출에 실패했습니다. 관리자에게 문의해주세요.</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? "제출 중..." : "프로필 등록하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
