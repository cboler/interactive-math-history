import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Input,
  NgZone,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-three-viewport',
  standalone: true,
  imports: [CommonModule],
  template: ` <div class="three-container" #canvasContainer aria-hidden="true"></div> `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 350px;
      }
      .three-container {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        overflow: hidden;
        background: #0f172a;
      }
    `,
  ],
})
export class ThreeViewportComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer') private containerRef!: ElementRef<HTMLDivElement>;
  @Input() shape: 'cube' | 'torus' | 'sphere' = 'cube';

  private readonly ngZone = inject(NgZone);
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private mesh!: THREE.Mesh;
  private animationFrameId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || !this.containerRef) {
      return;
    }
    this.initScene();
    this.initResizeObserver();
  }

  private initScene(): void {
    const container = this.containerRef.nativeElement;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 350;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    this.camera.position.z = 4;

    try {
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      // Graceful fallback if WebGL is unavailable (e.g. headless unit tests)
      return;
    }

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(this.renderer.domElement);

    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const material = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      wireframe: false,
      roughness: 0.3,
      metalness: 0.2,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 2, 50);
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);

    this.ngZone.runOutsideAngular(() => this.animate());
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    if (this.mesh) {
      this.mesh.rotation.x += 0.005;
      this.mesh.rotation.y += 0.008;
    }
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  };

  private initResizeObserver(): void {
    if (typeof ResizeObserver === 'undefined') {
      return;
    }
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width && height && this.renderer && this.camera) {
          this.camera.aspect = width / height;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(width, height);
        }
      }
    });
    this.resizeObserver.observe(this.containerRef.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.mesh) {
      this.mesh.geometry.dispose();
      (this.mesh.material as THREE.Material).dispose();
    }
    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement?.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }
  }
}
