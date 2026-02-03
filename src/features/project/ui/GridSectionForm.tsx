'use client';
import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

import { GridItem, ProjectFormType } from '../types/form';
import { GridEditor } from './grid-section';

interface GridSectionFormProps {
  form: ProjectFormType;
  setForm: React.Dispatch<React.SetStateAction<ProjectFormType>>;
  projectId: number | null;
}
export const GridSectionForm = ({ form, setForm, projectId }: GridSectionFormProps) => {
  const [sections, setSections] = useState<GridItem[][]>(() => {
    if (!form.body) return [[]];
    try {
      return JSON.parse(form.body);
    } catch {
      return [
        [
          {
            i: '1',
            x: 0,
            y: 0,
            w: 12,
            h: 10,
            type: 'text',
            content: form.body
          }
        ]
      ];
    }
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      body: JSON.stringify(sections)
    }));
  }, [sections, setForm]);

  const addSection = () => {
    setSections((prev) => [...prev, []]);
  };

  const removeSection = (index: number) => {
    if (sections.length === 1) return alert('최소 하나의 섹션은 필요합니다.');
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const updateSectionItems = (index: number, newItems: GridItem[]) => {
    setSections((prev) => {
      const newSections = [...prev];
      newSections[index] = newItems;
      return newSections;
    });
  };

  return (
    <section className="relative flex w-full flex-col px-8 pt-8 text-white">
      <div className="mb-8 flex flex-col gap-2">
        <h2 className="mb-4 text-3xl font-bold text-gray-200">소개 글 작성</h2>
        <div className="grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 font-bold text-emerald-500">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-black">?</span>
              진행 방법
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex gap-2">
                <span className="text-emerald-500">•</span>
                원하는 형태의 <strong>블록 유형</strong>을 선택하세요.
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500">•</span>
                입력창에 <strong>내용 또는 이미지</strong>를 삽입하세요.
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500">•</span>
                <strong>블록 추가 버튼</strong>을 눌러 레이아웃에 배치하세요.
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500">•</span>
                마우스로 위치와 크기를 <strong>자유롭게 설정</strong>하세요.
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500">•</span>
                섹션을 늘리고 싶다면 아래<strong>새로운 레이아웃 섹션 추가</strong>버튼을 활용 하세요.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="flex items-center gap-2 font-bold text-red-400">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-400 text-[10px] text-black">!</span>
              주의 사항
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex gap-2 border-l-2 border-red-400/30 pl-3">
                레이아웃 깨짐 방지를 위해 반드시 <strong>전체화면</strong>에서 작업해 주세요.
              </li>
              <li className="flex gap-2 border-l-2 border-red-400/30 pl-3">
                글자 블록에 <strong>스크롤바</strong>가 생길 경우, 실제 화면에서 내용이 잘릴 수 있으니 높이를 충분히 조절해 주세요.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        {sections.map((items, index) => (
          <GridEditor
            key={`section-${index}`}
            projectId={projectId}
            index={index}
            initialItems={items}
            onUpdate={(newItems) => updateSectionItems(index, newItems)}
            onRemoveSection={() => removeSection(index)}
            currentForm={form}
          />
        ))}
      </div>

      <div className="mt-12 mb-32 flex justify-center">
        <button
          onClick={addSection}
          className="hover:border-brand-primary flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-900/50 px-10 py-4 font-bold text-gray-400 transition-all hover:text-white"
        >
          <Plus size={20} />
          <span>새로운 레이아웃 섹션 추가</span>
        </button>
      </div>
    </section>
  );
};
