'use client';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ActivityContent } from 'entities/activity';

export const ImageSection = ({ data }: { data: ActivityContent }) => {
  return (
    <section className="mt-6 flex sm:h-screen">
      <div className="relative mr-6 hidden h-full flex-col items-center sm:mr-14 sm:flex">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            duration: 0.5
          }}
          className="border-brand-primary-cta bg-background-surface absolute top-20 z-10 box-border h-8 w-8 shrink-0 rounded-full border-8"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="h-full w-full rounded-full bg-current opacity-50"
          />
        </motion.div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: '100%', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mt-24 -mb-24 w-[1.5px] origin-top border-l-2 border-dashed border-zinc-700"
        />
      </div>

      <div className="mx-auto flex h-full w-full flex-1 flex-col justify-center py-10 sm:py-20">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-brand-primary-cta mb-4 font-bold sm:mb-16 sm:text-3xl"
        >
          {data.subTitle}
        </motion.h2>
        <div className={`mb-4 grid h-full shrink gap-4 sm:mb-8 sm:px-32 ${data.imageUrls?.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {data.imageUrls?.map((url, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative h-40 overflow-hidden rounded-md sm:h-auto sm:rounded-xl"
            >
              <Image src={url} fill alt="활동 이미지" className="object-cover" quality={100} />
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className="text-custom-gray-100 text-[10px] sm:px-32 sm:text-xl/7">
          {data.text}
        </motion.p>
      </div>
    </section>
  );
};
