"use client";

import { useState } from "react";

export default function Home() {
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
        <div>
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
                <input type="text" name="name" id="name" required className="py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md focus:ring-black focus:border-black" />
              </div>
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">성별</label>
              <div className="mt-1">
                <select id="gender" name="gender" required className="py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md focus:ring-black focus:border-black">
                  <option value="">선택해주세요</option>
                  <option value="남성 (한국)">남성 (한국)</option>
                  <option value="여성 (일본)">여성 (일본)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">생년월일</label>
              <div className="mt-1">
                <input type="date" name="birthDate" id="birthDate" required className="py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md focus:ring-black focus:border-black" />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">거주 지역</label>
              <div className="mt-1">
                <input type="text" name="location" id="location" placeholder="예: 서울, 도쿄" required className="py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md focus:ring-black focus:border-black" />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">연락처</label>
              <div className="mt-1">
                <input type="tel" name="phone" id="phone" required className="py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md focus:ring-black focus:border-black" />
              </div>
            </div>

            <div>
              <label htmlFor="messenger" className="block text-sm font-medium text-gray-700">메신저 ID (카카오톡/LINE)</label>
              <div className="mt-1">
                <input type="text" name="messenger" id="messenger" required className="py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md focus:ring-black focus:border-black" />
              </div>
            </div>

            {/* 상세 프로필 */}
            <div className="sm:col-span-2 border-b border-gray-200 pb-4 mt-6">
              <h3 className="text-lg font-medium text-gray-900">상세 프로필</h3>
            </div>

            <div>
              <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">직업</label>
              <div className="mt-1">
                <input type="text" name="occupation" id="occupation" className="py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md focus:ring-black focus:border-black" />
              </div>
            </div>

            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700">신장 (cm)</label>
              <div className="mt-1">
                <input type="number" name="height" id="height" className="py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md focus:ring-black focus:border-black" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700">결혼 여부</label>
              <div className="mt-1">
                <select id="maritalStatus" name="maritalStatus" className="py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md focus:ring-black focus:border-black">
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
                <textarea id="preferences" name="preferences" rows={4} className="py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md focus:ring-black focus:border-black"></textarea>
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
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
            >
              {isSubmitting ? "제출 중..." : "프로필 등록하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
