import { Container } from "../layout/Container";
import { Button } from "../ui/Button";

export function CTA() {
  return (
    <section className="py-24 bg-[#111111]">
      <Container>
        <div className="flex flex-col items-center text-center">
          <p className="mb-2 text-sm font-semibold tracking-widest text-[#2F6FED]">
            CONTACT
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            환경 측정이 필요하신가요?
          </h2>
          <p className="mt-4 text-sm text-white/60">
            편하게 문의해 주세요. 신속하게 답변 드리겠습니다.
          </p>
          <div className="mt-8">
            <Button href="/contact" size="sm">
              문의하기 &gt;
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
